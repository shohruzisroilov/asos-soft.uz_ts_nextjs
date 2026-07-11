import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

export interface SpinnerProps {
  size?: keyof typeof sizeMap;
  className?: string;
  label?: string;
}

export function Spinner({ size = "md", className, label = "Loading" }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <Loader2
        className={cn("animate-spin text-foreground-muted", sizeMap[size], className)}
        aria-hidden
      />
    </span>
  );
}
