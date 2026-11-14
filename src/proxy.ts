import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

function preferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        lang: tag.toLowerCase().split("-")[0],
        q: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter((entry) => !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) {
    const match = locales.find((locale) => locale === lang);
    if (match) return match;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  const locale = preferredLocale(request.headers.get("accept-language"));
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
