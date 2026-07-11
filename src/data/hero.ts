import {
  Globe,
  Smartphone,
  Database,
  BrainCircuit,
  Workflow,
  Palette,
  type LucideIcon,
} from "lucide-react";

export interface HeroStat {
  value: number;
  suffix?: string;
  label: string;
}

export const heroStats: HeroStat[] = [
  { value: 250, suffix: "+", label: "Projects delivered" },
  { value: 120, suffix: "+", label: "Happy clients" },
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 35, suffix: "+", label: "Experts on the team" },
];

export interface FloatingIcon {
  icon: LucideIcon;
  label: string;
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
  {
    icon: Globe,
    label: "Web development",
    className: "left-[6%] top-[22%]",
    delay: 0.2,
    duration: 6,
  },
  {
    icon: Smartphone,
    label: "Mobile apps",
    className: "left-[12%] bottom-[20%]",
    delay: 0.5,
    duration: 7,
  },
  {
    icon: Database,
    label: "CRM & ERP",
    className: "left-[3%] top-[52%]",
    delay: 0.8,
    duration: 5.5,
  },
  {
    icon: BrainCircuit,
    label: "AI solutions",
    className: "right-[6%] top-[24%]",
    delay: 0.35,
    duration: 6.5,
  },
  {
    icon: Workflow,
    label: "Automation",
    className: "right-[11%] bottom-[22%]",
    delay: 0.65,
    duration: 7.5,
  },
  {
    icon: Palette,
    label: "UI/UX & branding",
    className: "right-[3%] top-[54%]",
    delay: 0.95,
    duration: 6,
  },
];
