import {
  Globe,
  ShoppingCart,
  Users,
  Building2,
  Smartphone,
  Send,
  BrainCircuit,
  Workflow,
  Webhook,
  Cloud,
  LifeBuoy,
  Palette,
  LayoutDashboard,
  Search,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: ServiceItem[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "Fast, accessible websites built on modern frameworks that convert visitors into customers.",
    icon: Globe,
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    description:
      "Scalable online stores with secure checkout, payments, and inventory management.",
    icon: ShoppingCart,
  },
  {
    slug: "crm-development",
    title: "CRM Development",
    description:
      "Custom CRM platforms that centralize your sales pipeline and customer relationships.",
    icon: Users,
  },
  {
    slug: "erp-systems",
    title: "ERP Systems",
    description:
      "End-to-end ERP solutions that unify operations, finance, and resource planning.",
    icon: Building2,
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    description:
      "Native and cross-platform iOS & Android apps with pixel-perfect, fluid experiences.",
    icon: Smartphone,
  },
  {
    slug: "telegram-bots",
    title: "Telegram Bots",
    description:
      "Smart Telegram bots for sales, support, and automation — available around the clock.",
    icon: Send,
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    description:
      "LLM-powered assistants, chatbots, and intelligent automation tailored to your data.",
    icon: BrainCircuit,
  },
  {
    slug: "automation",
    title: "Automation",
    description:
      "Automate repetitive workflows to cut costs, remove errors, and free up your team.",
    icon: Workflow,
  },
  {
    slug: "api-integration",
    title: "API Integration",
    description:
      "Connect your tools and third-party services with reliable, well-documented APIs.",
    icon: Webhook,
  },
  {
    slug: "cloud-deployment",
    title: "Cloud Deployment",
    description:
      "Scalable cloud infrastructure with CI/CD pipelines and zero-downtime releases.",
    icon: Cloud,
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    description:
      "Proactive monitoring, maintenance, and 24/7 support to keep your systems healthy.",
    icon: LifeBuoy,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Research-driven interfaces and design systems that feel effortless and premium.",
    icon: Palette,
  },
  {
    slug: "admin-panels",
    title: "Admin Panels",
    description:
      "Powerful dashboards and admin panels to manage your data and business in real time.",
    icon: LayoutDashboard,
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    description:
      "Technical SEO, performance, and content strategy to grow your organic traffic.",
    icon: Search,
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    description:
      "Bespoke software engineered around your exact processes and business goals.",
    icon: Blocks,
  },
];
