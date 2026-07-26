import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Renders a red ring + border to signal a validation error. */
  invalid?: boolean;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid, leftIcon, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-surface px-4 text-sm text-foreground shadow-xs",
          "placeholder:text-foreground-subtle",
          "transition-all duration-200 ease-[var(--ease-out-expo)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          invalid
            ? "border-danger/60 focus-visible:ring-danger/50"
            : "border-border hover:border-foreground/20",
          leftIcon && "pl-11",
          className
        )}
        {...props}
      />
    );

    if (!leftIcon) return input;

    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle [&>svg]:size-4">
          {leftIcon}
        </span>
        {input}
      </div>
    );
  }
);
Input.displayName = "Input";
