import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiVuedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiTelegram,
  SiDocker,
  SiGooglecloud,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbBrandAdobePhotoshop, TbPalette } from "react-icons/tb";

export interface Technology {
  name: string;
  Icon: IconType;
}

/**
 * The 25 technologies we lead with, ordered frontend → backend → data →
 * mobile → bots → infrastructure → design. Rendered as a flat grid, so this
 * list is the single source of truth for both order and count.
 */
export const technologies: Technology[] = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Vue", Icon: SiVuedotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },

  { name: "Node.js", Icon: SiNodedotjs },
  { name: "NestJS", Icon: SiNestjs },
  { name: "Express", Icon: SiExpress },
  { name: "Python", Icon: SiPython },

  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Redis", Icon: SiRedis },

  { name: "React Native", Icon: SiReact },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Swift", Icon: SiSwift },
  { name: "Kotlin", Icon: SiKotlin },

  { name: "Telegram Bot", Icon: SiTelegram },

  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
  { name: "Google Cloud", Icon: SiGooglecloud },
  { name: "GitHub", Icon: SiGithub },

  { name: "Figma", Icon: SiFigma },
  { name: "Canva", Icon: TbPalette },
  { name: "Photoshop", Icon: TbBrandAdobePhotoshop },
];
