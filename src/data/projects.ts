import {
  Users,
  Sparkles,
  Building2,
  Truck,
  Compass,
  ShoppingBag,
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
  liveUrl?: string;
  githubUrl: string;
  icon: LucideIcon;
  image: string;
  type?: "web" | "app" | "bot";
}

export const projects: ProjectMeta[] = [
  {
    slug: "qorgon-dostavka",
    category: "E-commerce",
    technologies: ["Telegram Bot", "Node.js", "TypeScript", "PostgreSQL"],
    liveUrl: "https://t.me/qorgon_dostavka_bot",
    githubUrl: "https://github.com",
    icon: ShoppingBag,
    image: "/projects/qorgon-dostavka.png",
    type: "bot",
  },
  {
    slug: "sam-travel",
    category: "Web",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "i18next"],
    liveUrl: "https://sam-travel.uz",
    githubUrl: "https://github.com",
    icon: Compass,
    image: "/projects/sam-travel.jpg",
    type: "web",
  },
  {
    slug: "atlas-crm",
    category: "SaaS",
    technologies: ["React", "Node.js", "Prisma", "tRPC"],
    githubUrl: "https://github.com",
    icon: Users,
    image: "/projects/atlas-crm.png",
  },
  {
    slug: "lumen-ai",
    category: "AI",
    technologies: ["Next.js", "OpenAI", "Pinecone", "LangChain"],
    githubUrl: "https://github.com",
    icon: Sparkles,
    image: "/projects/lumen-ai.png",
  },
  {
    slug: "vertex-erp",
    category: "SaaS",
    technologies: ["Next.js", "tRPC", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com",
    icon: Building2,
    image: "/projects/vertex-erp.png",
  },
  {
    slug: "cargo-logistics",
    category: "Web",
    technologies: ["Next.js", "Mapbox", "Node.js", "WebSockets"],
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
