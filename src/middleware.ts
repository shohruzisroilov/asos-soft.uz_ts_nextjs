import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/** Pick a locale from the cookie, then Accept-Language, else the default. */
function resolveLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language");
  if (accept) {
    // e.g. "ru-RU,ru;q=0.9,en;q=0.8" → ["ru", "en"]
    const preferred = accept
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
    const match = preferred.find((lang) => isLocale(lang));
    if (match) return match;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already prefixed with a supported locale? Let it through.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Otherwise redirect to the resolved locale, preserving the path.
  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  // Skip Next internals, the API, static assets (anything with a dot),
  // and the file-based metadata routes served from app/ root.
  matcher: [
    "/((?!_next|api|icon|apple-icon|opengraph-image|.*\\..*).*)",
  ],
};
