import type { en } from "./dictionaries/en";

/**
 * The translation shape, derived from the English dictionary.
 * Every locale dictionary (uz, ru) is typed as `Dictionary`, so a missing or
 * mis-shaped key is a compile-time error — the three files can never drift.
 */
export type Dictionary = typeof en;
