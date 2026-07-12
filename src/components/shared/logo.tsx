import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function Logo({
  className,
  href = "/",
  showWordmark = true,
  size = 46,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
  size?: number;
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
      {/* Custom image mark */}
      <span
        className="relative flex items-center justify-center transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:rotate-[8deg]"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <Image
          src="/logo-black.png"
          alt=""
          width={size}
          height={size}
          className="dark:hidden object-contain"
          priority
        />
        <Image
          src="/logo-white.png"
          alt=""
          width={size}
          height={size}
          className="hidden dark:block object-contain"
          priority
        />
      </span>
      {showWordmark && (
        <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}



