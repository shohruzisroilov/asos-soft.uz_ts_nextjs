"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { mainNav, isActivePath } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n, useLocalizedHref } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { t } = useI18n();
  const localizedHref = useLocalizedHref();

  // Lock body scroll + close on Escape while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <m.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <m.nav
            className="glass absolute inset-x-3 top-3 rounded-2xl p-5 shadow-xl"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile"
          >
            <div className="flex items-center justify-between">
              <Logo href={localizedHref("/")} />
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-xs transition-all duration-200 ease-[var(--ease-out-expo)] hover:bg-background-subtle hover:border-foreground/20 active:scale-95"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <m.ul
              className="mt-6 flex flex-col gap-1"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <m.li key={item.href} variants={itemVariants}>
                    <a
                      href={localizedHref(item.href)}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        active
                          ? "bg-foreground/[0.06] text-foreground"
                          : "text-foreground-muted hover:bg-foreground/[0.04] hover:text-foreground"
                      )}
                    >
                      {t.nav[item.key]}
                      {active && (
                        <span
                          className="size-1.5 rounded-full bg-foreground"
                          aria-hidden
                        />
                      )}
                    </a>
                  </m.li>
                );
              })}
            </m.ul>

            <m.div variants={itemVariants} initial="hidden" animate="visible">
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-3.5 text-sm font-medium text-accent-foreground shadow-sm transition-all duration-200 ease-[var(--ease-out-expo)] hover:shadow-md active:scale-[0.98]"
              >
                {t.nav.cta}
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </m.div>
          </m.nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
