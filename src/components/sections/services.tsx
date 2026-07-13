"use client";

import { useRef, useState, useEffect } from "react";
import { m, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { services } from "@/data/services";
import { useI18n, useLocalizedHref } from "@/providers/i18n-provider";

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

function ServiceCard({ image, title, description }: ServiceCardProps) {
  const localizedHref = useLocalizedHref();

  return (
    <m.div variants={cardVariant} className="h-full">
      <a
        href={localizedHref("#contact")}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Service illustration cover */}
        <div className="relative aspect-[4/3] overflow-hidden bg-background-subtle">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/[0.02] transition-colors duration-300 group-hover:bg-black/[0.08]" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
            {description}
          </p>
        </div>
      </a>
    </m.div>
  );
}

export function Services() {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll function for Chevron controls
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 20 // card width + gap-5 (20px)
        : 300;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-slide effect when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // If we've scrolled near the end, reset to the start
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardWidth = container.firstElementChild
            ? (container.firstElementChild as HTMLElement).offsetWidth + 20
            : 300;
          container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-8 py-24 sm:py-32"
    >
      {/* Self-contained styling to hide scrollbars cleanly on all browsers */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <Container>
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl text-left">
            <Reveal>
              <Badge variant="subtle" dot>
                {t.services.badge}
              </Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="services-heading"
                className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {t.services.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-balance text-lg text-foreground-muted">
                {t.services.subheading}
              </p>
            </Reveal>
          </div>

          {/* Slider Chevron Navigation */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous service"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-xs transition-all duration-200 hover:bg-background-subtle hover:border-foreground/20 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next service"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-xs transition-all duration-200 hover:bg-background-subtle hover:border-foreground/20 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Snap-scrolling Carousel Container */}
        <div className="relative mt-16 overflow-hidden">
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="scrollbar-none flex overflow-x-auto gap-5 snap-x snap-mandatory scroll-smooth pb-4"
          >
            {services.map((service, i) => (
              <div
                key={service.slug}
                className="w-[85vw] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] shrink-0 snap-start snap-always"
              >
                <ServiceCard
                  image={service.image}
                  title={t.services.items[i].title}
                  description={t.services.items[i].description}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
