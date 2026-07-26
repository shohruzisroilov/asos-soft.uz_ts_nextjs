import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex w-full resize-y rounded-xl border bg-surface px-4 py-3 text-sm text-foreground shadow-xs",
        "placeholder:text-foreground-subtle",
        "transition-all duration-200 ease-[var(--ease-out-expo)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        invalid
          ? "border-danger/60 focus-visible:ring-danger/50"
          : "border-border hover:border-foreground/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
