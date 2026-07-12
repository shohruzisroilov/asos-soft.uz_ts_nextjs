"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Container, Badge } from "@/components/ui";
import { Reveal, Avatar } from "@/components/shared";
import { testimonials, type TestimonialMeta } from "@/data/testimonials";
import { useI18n } from "@/providers/i18n-provider";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

function Rating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? "fill-foreground text-foreground"
              : "fill-transparent text-foreground/25"
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  review,
}: {
  item: TestimonialMeta;
  review: string;
}) {
  return (
    <figure className="relative mx-auto flex min-h-[19rem] max-w-2xl flex-col rounded-3xl border border-border bg-surface p-8 shadow-sm sm:min-h-[16rem] sm:p-10">
      <Quote
        className="absolute right-8 top-8 size-10 text-foreground/[0.06]"
        aria-hidden
      />
      <Rating rating={item.rating} />
      <blockquote className="mt-5 flex-1">
        <p className="text-balance text-lg leading-relaxed text-foreground sm:text-xl">
          &ldquo;{review}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <Avatar name={item.name} src={item.avatar} size="lg" />
        <div>
          <div className="font-semibold tracking-tight text-foreground">
            {item.name}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 56 : -56 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -56 : 56 }),
};

export function Testimonials() {
  const { t } = useI18n();
  const count = testimonials.length;
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (dir: number) =>
      setState(([i]) => [(i + dir + count) % count, dir]),
    [count]
  );

  const goTo = (target: number) =>
    setState(([current]) => [target, target > current ? 1 : -1]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paginate, paused, index]);

  const current = testimonials[index];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-8 border-t border-border bg-background-subtle py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              {t.testimonials.badge}
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="testimonials-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t.testimonials.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              {t.testimonials.subheading}
            </p>
          </Reveal>
        </div>

        {/* Carousel */}
        <Reveal delay={0.2}>
          <div
            className="relative mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
          >
            <div className="overflow-hidden px-1 pb-1">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <m.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                >
                  <TestimonialCard
                    item={current}
                    review={t.testimonials.items[index].review}
                  />
                </m.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-xs transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      i === index
                        ? "w-6 bg-foreground"
                        : "w-2 bg-foreground/25 hover:bg-foreground/50"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-xs transition-all duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
