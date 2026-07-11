import {
  ClipboardList,
  ListChecks,
  PenTool,
  Code2,
  FlaskConical,
  Rocket,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Requirement Analysis",
    description:
      "We dig into your goals, users, and constraints to define exactly what success looks like.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Planning",
    description:
      "A clear roadmap, scope, and timeline — so everyone knows what ships and when.",
    icon: ListChecks,
  },
  {
    step: "03",
    title: "UI/UX Design",
    description:
      "Wireframes and pixel-perfect, interactive designs validated before a line of code is written.",
    icon: PenTool,
  },
  {
    step: "04",
    title: "Development",
    description:
      "Clean, tested, scalable code built in transparent sprints with regular demos.",
    icon: Code2,
  },
  {
    step: "05",
    title: "Testing",
    description:
      "Rigorous QA across devices — functionality, performance, security, and accessibility.",
    icon: FlaskConical,
  },
  {
    step: "06",
    title: "Deployment",
    description:
      "A smooth, zero-downtime launch with monitoring and analytics in place from day one.",
    icon: Rocket,
  },
  {
    step: "07",
    title: "Support",
    description:
      "Ongoing maintenance, updates, and 24/7 support to keep your product growing.",
    icon: LifeBuoy,
  },
];
