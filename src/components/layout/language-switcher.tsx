"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { useLocale } from "@/providers/i18n-provider";
import {
  locales,
  localeNames,
  localeShortNames,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Language switcher — swaps the leading `/<locale>` segment of the current
 * path and persists the choice in the NEXT_LOCALE cookie (so the middleware
 * respects it on the next visit).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchTo = (locale: Locale) => {
    setOpen(false);
    if (locale === current) return;

    // Replace the first path segment (the locale) with the new one.
    const segments = pathname.split("/");
    if (segments.length > 1 && isLocale(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    const nextPath = segments.join("/") || `/${locale}`;

    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.push(nextPath);
    router.refresh();
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={localeNames[current]}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-foreground shadow-xs",
          "transition-all duration-200 ease-[var(--ease-out-expo)] hover:bg-background-subtle hover:border-foreground/20 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Globe className="size-4" strokeWidth={1.75} aria-hidden />
        <span>{localeShortNames[current]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg"
          >
            {locales.map((locale) => {
              const active = locale === current;
              return (
                <li key={locale}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => switchTo(locale)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-foreground/[0.06] font-medium text-foreground"
                        : "text-foreground-muted hover:bg-foreground/[0.04] hover:text-foreground"
                    )}
                  >
                    {localeNames[locale]}
                    {active && <Check className="size-4" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
