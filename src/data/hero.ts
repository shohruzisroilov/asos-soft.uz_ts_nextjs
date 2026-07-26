/**
 * Non-translatable hero metadata. The matching labels live in the
 * dictionary (dict.hero.stats / dict.hero.floating) in the SAME order.
 */

export interface HeroStat {
  value: number;
  suffix?: string;
}

export const heroStats: HeroStat[] = [
  { value: 100, suffix: "+" },
  { value: 100, suffix: "+" },
  { value: 5, suffix: "+" },
  { value: 5, suffix: "+" },
];

