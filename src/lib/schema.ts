/**
 * Schema.org structured-data builders (JSON-LD).
 * Rendered via the <JsonLd> component. Keep values in sync with siteConfig.
 */
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

const socials = Object.values(siteConfig.social);

/** Organization — site-wide identity. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-black.png`,
    image: `${siteConfig.url}/logo-black.png`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.business.foundingYear),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    sameAs: socials,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactType: "customer support",
      availableLanguage: ["Uzbek", "Russian", "English"],
      areaServed: siteConfig.business.areaServed,
    },
  };
}

/** WebSite — enables sitelinks search box & site name in results. */
export function webSiteSchema(locale: Locale = "uz") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: locale,
  };
}

/** LocalBusiness — a software company with contact & service details. */
export function localBusinessSchema() {
  const { business } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    alternateName: [...siteConfig.alternateNames],
    image: `${siteConfig.url}/logo-black.png`,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange: business.priceRange,
    description: siteConfig.description,
    areaServed: business.areaServed,
    openingHours: business.openingHours,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.addressLocality,
      addressCountry: business.address.addressCountry,
    },
    sameAs: socials,
  };
}

/** FAQPage — eligible for the FAQ rich result. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** BreadcrumbList — for inner pages. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.path}`,
    })),
  };
}
