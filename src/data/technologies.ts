import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiDotnet,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGooglecloud,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiGithub,
  SiFigma,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiTelegram,
  SiElectron,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";
import { TbBrandAdobePhotoshop, TbPalette } from "react-icons/tb";

export interface Technology {
  name: string;
  Icon: IconType;
}

export interface TechnologyGroup {
  key: string;
  technologies: Technology[];
}

export const technologyGroups: TechnologyGroup[] = [
  {
    key: "frontend",
    technologies: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact },
      { name: "Vue", Icon: SiVuedotjs },
      { name: "Angular", Icon: SiAngular },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
    ],
  },
  {
    key: "backend",
    technologies: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "Express", Icon: SiExpress },
      { name: "Python", Icon: SiPython },
    ],
  },
  {
    key: "mobile",
    technologies: [
      { name: "React Native", Icon: SiReact },
      { name: "Flutter", Icon: SiFlutter },
      { name: "Swift", Icon: SiSwift },
      { name: "Kotlin", Icon: SiKotlin },
    ],
  },
  {
    key: "bot",
    technologies: [
      { name: "Telegram Bot", Icon: SiTelegram },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Python", Icon: SiPython },
    ],
  },
  {
    key: "desktop",
    technologies: [
      { name: "Electron", Icon: SiElectron },
      { name: ".NET", Icon: SiDotnet },
      { name: "Python", Icon: SiPython },
    ],
  },
  {
    key: "devops",
    technologies: [
      { name: "Docker", Icon: SiDocker },
      { name: "AWS", Icon: FaAws },
      { name: "Azure", Icon: VscAzure },
      { name: "Google Cloud", Icon: SiGooglecloud },
      { name: "GitHub", Icon: SiGithub },
    ],
  },
  {
    key: "database",
    technologies: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
    ],
  },
  {
    key: "design",
    technologies: [
      { name: "Figma", Icon: SiFigma },
      { name: "Canva", Icon: TbPalette },
      { name: "Photoshop", Icon: TbBrandAdobePhotoshop },
    ],
  },
];
