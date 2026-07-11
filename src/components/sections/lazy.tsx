"use client";

import dynamic from "next/dynamic";
import { LazyOnView } from "@/components/shared/lazy-on-view";

/**
 * The two heaviest, most interactive, least SEO-critical sections (the
 * testimonials carousel and the contact form) are code-split with
 * `ssr: false` and mounted only when scrolled near, so their JS stays out of
 * the initial page load. A reserved min-height prevents CLS, and a generous
 * rootMargin loads them before they're visible (no pop-in).
 *
 * SEO-important sections (Services, Portfolio, Technologies, FAQ) stay
 * server-rendered. The contact email/phone also live in the always-SSR'd
 * footer, so discoverability is unaffected.
 */
const TestimonialsImpl = dynamic(
  () => import("./testimonials").then((m) => m.Testimonials),
  { ssr: false }
);
const ContactImpl = dynamic(() => import("./contact").then((m) => m.Contact), {
  ssr: false,
});

export function LazyTestimonials() {
  return (
    <LazyOnView minHeight={560}>
      <TestimonialsImpl />
    </LazyOnView>
  );
}

export function LazyContact() {
  return (
    <LazyOnView minHeight={680}>
      <ContactImpl />
    </LazyOnView>
  );
}
