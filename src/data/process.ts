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

/**
 * Process step numbers + icons. The translatable title/description live in
 * the dictionary (dict.process.items) in the SAME order.
 */
export interface ProcessMeta {
  step: string;
  icon: LucideIcon;
}

export const processSteps: ProcessMeta[] = [
  { step: "01", icon: ClipboardList },
  { step: "02", icon: ListChecks },
  { step: "03", icon: PenTool },
  { step: "04", icon: Code2 },
  { step: "05", icon: FlaskConical },
  { step: "06", icon: Rocket },
  { step: "07", icon: LifeBuoy },
];
