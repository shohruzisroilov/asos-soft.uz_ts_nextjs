"use client";

import { m, type Variants } from "framer-motion";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { services } from "@/data/services";
import { useI18n, useLocalizedHref } from "@/providers/i18n-provider";
import { viewportOnce } from "@/lib/motion";

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

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

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-8 py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
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

        {/* Services grid */}
        <m.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              image={service.image}
              title={t.services.items[i].title}
              description={t.services.items[i].description}
            />
          ))}
        </m.div>
      </Container>
    </section>
  );
}
