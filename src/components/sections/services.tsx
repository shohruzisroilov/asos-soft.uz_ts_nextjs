"use client";

import Link from "next/link";
import { m, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Badge } from "@/components/ui";
import { Reveal } from "@/components/shared";
import { services, type ServiceItem } from "@/data/services";
import { viewportOnce } from "@/lib/motion";

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function ServiceCard({ service }: { service: ServiceItem }) {
  const { icon: Icon, title, description, slug } = service;

  return (
    <m.div variants={cardVariant}>
      <Link
        href={`/services/${slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Hover glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at 50% 0%, color-mix(in oklab, var(--foreground) 8%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex h-full flex-col">
          {/* Icon */}
          <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-background-subtle text-foreground transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-md">
            <Icon className="size-6" strokeWidth={1.75} aria-hidden />
          </span>

          {/* Title */}
          <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
            {description}
          </p>

          {/* Learn More */}
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            Learn more
            <ArrowRight className="size-4 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </m.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge variant="subtle" dot>
              What we do
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="services-heading"
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Services built to scale your business
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-balance text-lg text-foreground-muted">
              From first line of code to launch and beyond — everything you need
              to design, build, and grow a modern digital product.
            </p>
          </Reveal>
        </div>

        {/* Responsive grid */}
        <m.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </m.div>
      </Container>
    </section>
  );
}
