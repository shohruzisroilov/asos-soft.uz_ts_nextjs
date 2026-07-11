import {
  ShoppingBag,
  Users,
  Dumbbell,
  Sparkles,
  Building2,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type ProjectCategory =
  | "Web"
  | "E-commerce"
  | "Mobile"
  | "AI"
  | "SaaS";

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  icon: LucideIcon;
}

export const projects: Project[] = [
  {
    slug: "northwind-commerce",
    title: "Northwind Commerce",
    description:
      "A headless e-commerce platform with real-time inventory, one-click checkout, and a lightning-fast storefront.",
    category: "E-commerce",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: ShoppingBag,
  },
  {
    slug: "atlas-crm",
    title: "Atlas CRM",
    description:
      "A modern CRM that unifies sales pipelines, contacts, and analytics into a single collaborative workspace.",
    category: "SaaS",
    technologies: ["React", "Node.js", "Prisma", "tRPC"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Users,
  },
  {
    slug: "pulse-fitness",
    title: "Pulse Fitness",
    description:
      "A cross-platform fitness app with personalized plans, live workout tracking, and social challenges.",
    category: "Mobile",
    technologies: ["React Native", "Expo", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Dumbbell,
  },
  {
    slug: "lumen-ai",
    title: "Lumen AI",
    description:
      "An AI knowledge assistant that answers questions over private documents with cited, trustworthy responses.",
    category: "AI",
    technologies: ["Next.js", "OpenAI", "Pinecone", "LangChain"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Sparkles,
  },
  {
    slug: "vertex-erp",
    title: "Vertex ERP",
    description:
      "An enterprise resource platform connecting finance, HR, and operations with real-time dashboards.",
    category: "SaaS",
    technologies: ["Next.js", "tRPC", "PostgreSQL", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Building2,
  },
  {
    slug: "cargo-logistics",
    title: "Cargo Logistics",
    description:
      "A logistics dashboard with live fleet tracking, route optimization, and delivery analytics on a map.",
    category: "Web",
    technologies: ["Next.js", "Mapbox", "Node.js", "WebSockets"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Truck,
  },
];

/** Ordered filter list — "All" first, then the categories that exist. */
export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  ...(Array.from(new Set(projects.map((p) => p.category))) as ProjectCategory[]),
];
