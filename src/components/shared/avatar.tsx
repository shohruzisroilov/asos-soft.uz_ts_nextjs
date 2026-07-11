import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "size-9 text-xs",
  md: "size-12 text-sm",
  lg: "size-14 text-base",
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export interface AvatarProps {
  name: string;
  src?: string;
  size?: keyof typeof sizeMap;
  className?: string;
}

/**
 * Circular avatar. Renders the image when `src` is provided, otherwise a
 * monogram derived from the name — so it never shows a broken image.
 */
export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full border border-border font-semibold text-foreground",
        "bg-gradient-to-br from-foreground/[0.1] to-foreground/[0.03]",
        sizeMap[size],
        className
      )}
      aria-hidden
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
