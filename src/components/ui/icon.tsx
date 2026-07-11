import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconWrapperVariants = cva(
  "inline-flex items-center justify-center shrink-0 transition-colors",
  {
    variants: {
      variant: {
        solid: "bg-accent text-accent-foreground",
        subtle: "bg-foreground/[0.06] text-foreground",
        outline: "border border-border text-foreground",
        glass: "glass text-foreground",
      },
      size: {
        sm: "size-8 rounded-lg [&>svg]:size-4",
        md: "size-10 rounded-xl [&>svg]:size-5",
        lg: "size-12 rounded-xl [&>svg]:size-6",
        xl: "size-14 rounded-2xl [&>svg]:size-7",
      },
    },
    defaultVariants: { variant: "subtle", size: "md" },
  }
);

export interface IconProps extends VariantProps<typeof iconWrapperVariants> {
  icon: LucideIcon;
  className?: string;
  "aria-label"?: string;
}

/**
 * Renders a Lucide icon inside a consistent, themeable container.
 * Standardizes icon framing across features, services, and stats.
 */
export function Icon({
  icon: IconComponent,
  variant,
  size,
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <span
      className={cn(iconWrapperVariants({ variant, size }), className)}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <IconComponent strokeWidth={1.75} />
    </span>
  );
}

export { iconWrapperVariants };
