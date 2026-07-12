/**
 * Navigation structure — hrefs + dictionary keys. Labels are resolved from
 * the active locale's dictionary (dict.nav) so the menu is fully translated.
 */
import { locales } from "@/i18n/config";

/** A key into dict.nav — used to look up the translated label. */
export type NavKey =
  | "home"
  | "services"
  | "portfolio"
  | "technologies"
  | "about"
  | "contact";

export interface NavItem {
  key: NavKey;
  /** Same-page section anchor (or "/" for the top of the home page). */
  href: string;
}

/*
 * This is a single-page site, so every nav target is an in-page section
 * anchor. "About" maps to the "Why AsosSoft" section (there's no separate
 * about page). Items without a matching section (e.g. Blog) are omitted so
 * no link is ever dead.
 */
export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "#services" },
  { key: "portfolio", href: "#portfolio" },
  { key: "technologies", href: "#technologies" },
  { key: "about", href: "#why-choose" },
  { key: "contact", href: "#contact" },
];

/** Footer "Quick Links" — a subset of the main nav, by key. */
export const footerQuickLinks: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "#services" },
  { key: "portfolio", href: "#portfolio" },
  { key: "about", href: "#why-choose" },
  { key: "contact", href: "#contact" },
];

/**
 * Footer "Services" links. There are no per-service pages yet, so each points
 * to the contact section to request a quote. Labels come from
 * dict.footer.servicesLinks in the SAME order.
 */
export const footerServiceLinks: string[] = [
  "#contact",
  "#contact",
  "#contact",
  "#contact",
  "#contact",
  "#contact",
];

/** CTA button target. Label comes from dict.nav.cta. */
export const ctaConfig = {
  href: "#contact",
} as const;

/** Remove a leading `/<locale>` segment, so `/uz/services` → `/services`. */
function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname;
}

/**
 * Whether `href` (locale-agnostic, e.g. "/services") is the active route for
 * the current `pathname` (locale-prefixed, e.g. "/uz/services").
 * "/" matches only the exact home path; others match nested routes too.
 */
export function isActivePath(pathname: string, href: string): boolean {
  const path = stripLocale(pathname);
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}
