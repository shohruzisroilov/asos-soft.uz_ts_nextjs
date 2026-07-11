import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

/**
 * Native-checkbox-backed control (accessible, form-associated) with a
 * custom visual layer. The real <input> is visually hidden but focusable.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <span className="relative inline-flex size-5 shrink-0">
      <input
        ref={ref}
        type="checkbox"
        className="peer absolute inset-0 z-10 cursor-pointer appearance-none rounded-md opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span
        className={cn(
          "pointer-events-none flex size-5 items-center justify-center rounded-md border border-border bg-surface shadow-xs",
          "transition-all duration-150 ease-[var(--ease-out-expo)]",
          "peer-hover:border-foreground/30",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-background",
          "peer-checked:border-accent peer-checked:bg-accent peer-disabled:opacity-50",
          // reveal the check only when the sibling <input> is checked
          "peer-checked:[&>svg]:opacity-100",
          className
        )}
      >
        <Check
          className="size-3.5 text-accent-foreground opacity-0 transition-opacity duration-150"
          strokeWidth={3}
          aria-hidden
        />
      </span>
    </span>
  )
);
Checkbox.displayName = "Checkbox";
