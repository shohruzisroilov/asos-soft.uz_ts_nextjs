import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localeHtmlLang, withLocale } from "@/i18n/config";

/**
 * The site is a single page, so the sitemap lists only the localized home
 * pages (the only real routes), each cross-linked via hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const languages = Object.fromEntries(
    locales.map((l) => [localeHtmlLang[l], `${base}${withLocale(l, "/")}`])
  );

  return locales.map((locale) => ({
    url: `${base}${withLocale(locale, "/")}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}
