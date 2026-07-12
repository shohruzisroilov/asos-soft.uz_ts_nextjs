import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/shared/logo";
import { BackToTop } from "./back-to-top";
import {
  footerQuickLinks,
  footerServiceLinks,
  ctaConfig,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { withLocale, type Locale } from "@/i18n/config";

const contactItems = [
  {
    Icon: Mail,
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    Icon: Phone,
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  { Icon: MapPin, value: siteConfig.contact.address, href: undefined },
];

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { nav, footer } = dict;
  const year = new Date().getFullYear();
  const href = (path: string) => withLocale(locale, path);

  return (
    <footer className="relative border-t border-border bg-background-subtle">
      <Container>
        {/* Utility bar — CTA + Back to top */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-border py-6 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            {footer.ready}{" "}
            <a
              href={href(ctaConfig.href)}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {footer.getQuote}
            </a>
          </p>
          <BackToTop label={footer.backToTop} />
        </div>

        {/* Main columns */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand + social */}
          <div className="max-w-sm">
            <Logo href={href("/")} />
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label={footer.quickLinks}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={href(item.href)}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={footer.servicesTitle}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerServiceLinks.map((path, i) => (
                <li key={i}>
                  <a
                    href={href(path)}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {footer.servicesLinks[i]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {footer.getInTouch}
            </h3>
            <ul className="mt-4 space-y-3">
              {contactItems.map(({ Icon, value, href: contactHref }) => (
                <li key={value} className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-foreground-subtle"
                    aria-hidden
                  />
                  {contactHref ? (
                    <a
                      href={contactHref}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground-muted">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — copyright */}
        <div className="flex items-center justify-center border-t border-border py-8">
          <p className="text-xs text-foreground-subtle">
            © {year} {siteConfig.legalName}. {footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
