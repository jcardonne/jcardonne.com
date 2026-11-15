import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = /^[^\s@<>"',;:]+@[^\s@<>"',;:]+\.[^\s@<>"',;:]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 20_000;

// Best effort: the map lives per server instance, so it slows bursts rather than enforcing a hard quota.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

/**
 * Checks a Cloudflare Turnstile token. Skipped when no secret is configured,
 * so the form keeps working locally and before the widget is set up.
 */
async function passesTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip === "unknown" ? {} : { remoteip: ip }) }),
    });
    const result = (await res.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

const MAX_ATTEMPTS = 3;
const MAX_WAIT_MS = 5000;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Posts to a Discord webhook, retrying on rate limits (429) and server errors (5xx). */
async function postToDiscord(webhook: string, payload: string): Promise<boolean> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let wait = 500 * 2 ** (attempt - 1);
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
      if (res.ok) return true;
      if (res.status !== 429 && res.status < 500) return false;
      if (res.status === 429) {
        // Discord gives the delay in seconds, in the body and in Retry-After.
        const body = (await res.json().catch(() => ({}))) as { retry_after?: number };
        const seconds = body.retry_after ?? Number(res.headers.get("retry-after"));
        if (Number.isFinite(seconds) && seconds > 0) wait = seconds * 1000;
      }
    } catch {
      // Network error: retry with backoff.
    }
    if (attempt === MAX_ATTEMPTS || wait > MAX_WAIT_MS) return false;
    await sleep(wait);
  }
  return false;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && URL.parse(origin)?.host !== host) return fail("forbidden", 403);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail("too_large", 413);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return fail("invalid", 422);
    body = parsed as Record<string, unknown>;
  } catch {
    return fail("invalid", 422);
  }

  // Honeypot field: answer as if it worked so bots get no signal.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail("rate_limited", 429);

  const name = clean(body.name, 120).replace(/[\r\n]+/g, " ");
  const email = clean(body.email, 254);
  const message = clean(body.message, 5000);
  if (!name || !EMAIL.test(email) || message.length < 10) return fail("invalid", 422);

  if (!(await passesTurnstile(clean(body["cf-turnstile-response"], 2048), ip))) {
    return fail("challenge_failed", 403);
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return fail("not_configured", 503);

  const payload = JSON.stringify({
    username: "jcardonne.com",
    // Visitor text must never ping @everyone, roles or users.
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: `New message from ${name}`.slice(0, 256),
        description: message.slice(0, 4000),
        color: 0x4d3dfd,
        fields: [{ name: "Reply to", value: email }],
        timestamp: new Date().toISOString(),
      },
    ],
  });

  if (!(await postToDiscord(webhook, payload))) return fail("send_failed", 502);

  return NextResponse.json({ ok: true });
}
