import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button style variants. Kept in a plain (non-client) module so it can be
 * called from both Server and Client Components — e.g. to style a <Link>
 * as a button via `className={buttonVariants(...)}`.
 */
export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-medium select-none " +
    "transition-all duration-200 ease-[var(--ease-out-expo)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:opacity-90",
        secondary:
          "bg-surface-elevated text-foreground border border-border shadow-xs hover:bg-background-subtle hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-foreground/[0.04] hover:border-foreground/20",
        ghost: "bg-transparent text-foreground hover:bg-foreground/[0.06]",
        link: "text-foreground underline-offset-4 hover:underline p-0 h-auto overflow-visible",
        glass:
          "glass text-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 rounded-lg px-3.5 text-sm",
        md: "h-11 rounded-xl px-5 text-sm",
        lg: "h-13 rounded-xl px-7 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
