import { notFound } from "next/navigation";
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
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * Home page.
 *
 * SEO-critical sections are statically imported and server-rendered.
 * The two heaviest, least-critical sections (Testimonials, Contact) are
 * deferred and loaded on scroll — see DeferredSections.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

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
        <Faq dict={dict.faq} locale={locale} />
        <LazyTestimonials />
        <LazyContact />
      </main>
      <Footer dict={dict} locale={locale} />

      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(dict.faq.items)} />
    </>
  );
}
