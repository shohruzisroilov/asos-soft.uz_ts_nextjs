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

export interface Reason {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const reasons: Reason[] = [
  {
    title: "Fast Delivery",
    description:
      "Agile sprints and clear milestones get your product to market weeks ahead of schedule.",
    icon: Rocket,
  },
  {
    title: "Modern Technologies",
    description:
      "We build on the latest, proven stack — engineered for speed, security, and longevity.",
    icon: Cpu,
  },
  {
    title: "Affordable Pricing",
    description:
      "Transparent, flexible pricing that delivers premium quality without the premium markup.",
    icon: Wallet,
  },
  {
    title: "Scalable Architecture",
    description:
      "Systems designed to grow with you — from your very first user to your millionth.",
    icon: Network,
  },
  {
    title: "Professional Team",
    description:
      "Senior designers and engineers who have shipped products for startups and enterprises.",
    icon: Users,
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock monitoring and support, so your business never skips a beat.",
    icon: Headphones,
  },
  {
    title: "Premium UI",
    description:
      "Pixel-perfect, accessible interfaces crafted with obsessive attention to detail.",
    icon: Gem,
  },
  {
    title: "SEO Optimized",
    description:
      "Built for performance and discoverability, so your customers find you first.",
    icon: TrendingUp,
  },
];
