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
  SiLaravel,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGooglecloud,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";

export interface Technology {
  name: string;
  Icon: IconType;
}

/**
 * The stack we build with. Logos are rendered monochrome (currentColor)
 * for a cohesive look that adapts to light and dark themes.
 * AWS / Azure come from Font Awesome / VS Code icon sets because they were
 * removed from Simple Icons over trademark policy.
 */
export const technologies: Technology[] = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "Vue", Icon: SiVuedotjs },
  { name: "Angular", Icon: SiAngular },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "NestJS", Icon: SiNestjs },
  { name: "Express", Icon: SiExpress },
  { name: ".NET", Icon: SiDotnet },
  { name: "Laravel", Icon: SiLaravel },
  { name: "Python", Icon: SiPython },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Redis", Icon: SiRedis },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
  { name: "Azure", Icon: VscAzure },
  { name: "Google Cloud", Icon: SiGooglecloud },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Figma", Icon: SiFigma },
];
