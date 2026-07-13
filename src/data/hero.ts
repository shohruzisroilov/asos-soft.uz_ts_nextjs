/**
 * Non-translatable hero metadata. The matching labels live in the
 * dictionary (dict.hero.stats / dict.hero.floating) in the SAME order.
 */

export interface HeroStat {
  value: number;
  suffix?: string;
}

export const heroStats: HeroStat[] = [
  { value: 250, suffix: "+" },
  { value: 120, suffix: "+" },
  { value: 10, suffix: "+" },
  { value: 35, suffix: "+" },
];

