"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { withLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

interface I18nContextValue {
  locale: Locale;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Provides the active locale + its dictionary to every client component in
 * the tree. Mounted once in app/[locale]/layout.tsx with the server-resolved
 * dictionary, so translations are available without prop-drilling.
 */
export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, t: dict }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Access the active locale and its dictionary from any client component. */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an <I18nProvider>.");
  }
  return ctx;
}

/** The active locale. */
export function useLocale(): Locale {
  return useI18n().locale;
}

/** Prefix a path with the active locale, e.g. localizedHref("/contact"). */
export function useLocalizedHref() {
  const { locale } = useI18n();
  return (path: string) => withLocale(locale, path);
}
