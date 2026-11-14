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

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return fail("not_configured", 503);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "jcardonne.com <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio: message from ${name}`,
        text: `${message}\n\n${name} <${email}>`,
      }),
    });
    if (!res.ok) return fail("send_failed", 502);
  } catch {
    return fail("send_failed", 502);
  }

  return NextResponse.json({ ok: true });
}
