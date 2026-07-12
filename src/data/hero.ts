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

export interface FloatingIcon {
  /** Path to SVG image in public/ directory. */
  src: string;
  alt: string;
  /** Absolute-position + entrance/float tuning per icon. */
  className: string;
  delay: number;
  duration: number;
}

/**
 * Technology icons that float around the hero. Positioned toward the edges
 * so they frame — never overlap — the headline. Hidden on small screens.
 */
export const floatingIcons: FloatingIcon[] = [
  { src: "/icons/web.svg", alt: "Web Development", className: "left-[6%] top-[22%]", delay: 0.2, duration: 6 },
  { src: "/icons/mobile.svg", alt: "Mobile Apps", className: "left-[12%] bottom-[20%]", delay: 0.5, duration: 7 },
  { src: "/icons/database.svg", alt: "Database", className: "left-[3%] top-[52%]", delay: 0.8, duration: 5.5 },
  { src: "/icons/ai-brain.svg", alt: "AI Solutions", className: "right-[6%] top-[24%]", delay: 0.35, duration: 6.5 },
  { src: "/icons/automation.svg", alt: "Automation", className: "right-[11%] bottom-[22%]", delay: 0.65, duration: 7.5 },
  { src: "/icons/design.svg", alt: "UI/UX Design", className: "right-[3%] top-[54%]", delay: 0.95, duration: 6 },
];
