import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function Logo({
  className,
  href = "/",
  showWordmark = true,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {/* Monochrome mark */}
      <span
        className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-[8deg]"
        aria-hidden
      >
        <span className="text-sm font-bold tracking-tight">A</span>
      </span>
      {showWordmark && (
        <span className="text-[0.95rem] font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
