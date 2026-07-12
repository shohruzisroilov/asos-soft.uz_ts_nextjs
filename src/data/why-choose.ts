import {
  Rocket,
  Cpu,
  Wallet,
  Network,
  Users,
  Headphones,
  Gem,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/**
 * "Why choose us" icons. The translatable title/description live in the
 * dictionary (dict.whyChoose.items) in the SAME order.
 */
export interface ReasonMeta {
  icon: LucideIcon;
}

export const reasons: ReasonMeta[] = [
  { icon: Rocket },
  { icon: Cpu },
  { icon: Wallet },
  { icon: Network },
  { icon: Users },
  { icon: Headphones },
  { icon: Gem },
  { icon: TrendingUp },
];
