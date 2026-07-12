/**
 * Internationalization config — the single source of truth for the
 * locales the site supports, the default locale, and their display names.
 */

export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

/** Uzbek is the default — asos-soft.uz is a UZ-first company site. */
export const defaultLocale: Locale = "uz";

/** Human-readable names shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

/** Short labels (e.g. for a compact switcher). */
export const localeShortNames: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

/** BCP-47 language tags used for <html lang> and SEO. */
export const localeHtmlLang: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "en",
};

/** Type guard — is the given string one of our supported locales? */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Prefix a path with a locale segment, e.g. withLocale("uz", "/contact")
 * → "/uz/contact". A bare "/" becomes "/uz". Same-page anchors are attached
 * to the localized home page, e.g. withLocale("uz", "#contact") → "/uz#contact".
 */
export function withLocale(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  if (path.startsWith("#")) return `/${locale}${path}`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
