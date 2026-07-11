import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

const sizes = {
  sm: "max-w-3xl", // ~768px  — prose / forms
  md: "max-w-5xl", // ~1024px — narrow content
  lg: "max-w-7xl", // ~1280px — default site width
  xl: "max-w-[88rem]", // wide feature sections
  full: "max-w-none",
} as const;

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: keyof typeof sizes;
}

/**
 * Horizontal content wrapper — centers content and applies responsive
 * gutters. The single source of truth for page width across the app.
 */
export function Container({
  as: Tag = "div",
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", sizes[size], className)}
      {...props}
    />
  );
}
