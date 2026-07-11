"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Disable the click ripple (auto-off for the "link" variant). */
  disableRipple?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      disableRipple,
      onPointerDown,
      ...props
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion();
    const [ripples, setRipples] = React.useState<Ripple[]>([]);
    const keyRef = React.useRef(0);
    const rippleEnabled = !disableRipple && variant !== "link" && !reduceMotion;

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(e);
      if (!rippleEnabled || disabled || isLoading) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      setRipples((prev) => [
        ...prev,
        {
          key: keyRef.current++,
          size,
          x: e.clientX - rect.left - size / 2,
          y: e.clientY - rect.top - size / 2,
        },
      ]);
    };

    const removeRipple = (key: number) =>
      setRipples((prev) => prev.filter((r) => r.key !== key));

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {isLoading && (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}

        {/* Click ripples */}
        {rippleEnabled &&
          ripples.map((r) => (
            <span
              key={r.key}
              aria-hidden
              onAnimationEnd={() => removeRipple(r.key)}
              className="pointer-events-none absolute rounded-full bg-current"
              style={{
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
                animation: "var(--animate-ripple)",
              }}
            />
          ))}
      </button>
    );
  }
);
Button.displayName = "Button";
