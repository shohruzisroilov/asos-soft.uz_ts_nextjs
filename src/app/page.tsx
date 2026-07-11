import {
  Hero,
  Services,
  Portfolio,
  Technologies,
  WhyChoose,
  Process,
  Faq,
} from "@/components/sections";
import { LazyTestimonials, LazyContact } from "@/components/sections/lazy";
import { Navbar, Footer } from "@/components/layout";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { faqs } from "@/data/faq";

/**
 * Home page.
 *
 * SEO-critical sections are statically imported and server-rendered.
 * The two heaviest, least-critical sections (Testimonials, Contact) are
 * deferred and loaded on scroll — see DeferredSections.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Technologies />
        <WhyChoose />
        <Process />
        <Faq />
        <LazyTestimonials />
        <LazyContact />
      </main>
      <Footer />

      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
