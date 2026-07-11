import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/shared/logo";
import { BackToTop } from "./back-to-top";
import { footerNav, ctaConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { label: "Twitter", href: siteConfig.social.twitter, Icon: Twitter },
  { label: "GitHub", href: siteConfig.social.github, Icon: Github },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: "Dribbble", href: siteConfig.social.dribbble, Icon: Dribbble },
];

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background-subtle">
      <Container>
        {/* Utility bar — CTA + Back to top */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-border py-6 sm:flex-row">
          <p className="text-sm text-foreground-muted">
            Ready to start your project?{" "}
            <Link
              href={ctaConfig.href}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Get a free quote →
            </Link>
          </p>
          <BackToTop />
        </div>

        {/* Main columns */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand + social */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-foreground/25 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links + Services groups */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3">
              {contactItems.map(({ Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-foreground-subtle"
                    aria-hidden
                  />
                  {href ? (
                    <a
                      href={href}
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

        {/* Bottom bar — copyright + legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 sm:flex-row">
          <p className="text-xs text-foreground-subtle">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-foreground-subtle transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-foreground-subtle transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
