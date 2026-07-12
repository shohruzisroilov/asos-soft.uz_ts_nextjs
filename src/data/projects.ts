import {
  ShoppingBag,
  Users,
  Dumbbell,
  Sparkles,
  Building2,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type ProjectCategory = "Web" | "E-commerce" | "Mobile" | "AI" | "SaaS";

/**
 * Non-translatable project metadata. The title/description live in the
 * dictionary (dict.portfolio.items) in the SAME order.
 */
export interface ProjectMeta {
  slug: string;
  category: ProjectCategory;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  icon: LucideIcon;
  image: string;
}

export const projects: ProjectMeta[] = [
  {
    slug: "northwind-commerce",
    category: "E-commerce",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: ShoppingBag,
    image: "/projects/northwind-commerce.png",
  },
  {
    slug: "atlas-crm",
    category: "SaaS",
    technologies: ["React", "Node.js", "Prisma", "tRPC"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Users,
    image: "/projects/atlas-crm.png",
  },
  {
    slug: "pulse-fitness",
    category: "Mobile",
    technologies: ["React Native", "Expo", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Dumbbell,
    image: "/projects/pulse-fitness.png",
  },
  {
    slug: "lumen-ai",
    category: "AI",
    technologies: ["Next.js", "OpenAI", "Pinecone", "LangChain"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Sparkles,
    image: "/projects/lumen-ai.png",
  },
  {
    slug: "vertex-erp",
    category: "SaaS",
    technologies: ["Next.js", "tRPC", "PostgreSQL", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Building2,
    image: "/projects/vertex-erp.png",
  },
  {
    slug: "cargo-logistics",
    category: "Web",
    technologies: ["Next.js", "Mapbox", "Node.js", "WebSockets"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    icon: Truck,
    image: "/projects/cargo-logistics.png",
  },
];

/** Ordered filter list — "All" first, then the categories that exist. */
export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  ...(Array.from(new Set(projects.map((p) => p.category))) as ProjectCategory[]),
];
