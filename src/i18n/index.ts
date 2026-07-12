import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { en } from "./dictionaries/en";
import { uz } from "./dictionaries/uz";
import { ru } from "./dictionaries/ru";

export type { Dictionary } from "./types";
export type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { uz, ru, en };

/** Returns the full translation dictionary for a locale. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
