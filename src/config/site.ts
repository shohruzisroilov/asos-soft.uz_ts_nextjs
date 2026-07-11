/**
 * Global site configuration — single source of truth for brand,
 * metadata, and contact details used across the app and SEO.
 */

export const siteConfig = {
  name: "AsosSoft",
  legalName: "AsosSoft LLC",
  tagline: "Software that moves your business forward",
  description:
    "AsosSoft is a premium software studio building high-performance web, mobile, and cloud products for ambitious companies.",
  url: "https://asossoft.com",
  ogImage: "/og.png",
  locale: "en_US",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "UI/UX design",
    "Next.js agency",
    "AsosSoft",
  ],
  contact: {
    email: "hello@asossoft.com",
    phone: "+1 (000) 000-0000",
    address: "Remote-first · Worldwide",
  },
  /** Structured business details used for LocalBusiness / Organization JSON-LD. */
  business: {
    foundingYear: 2018,
    priceRange: "$$",
    areaServed: "Worldwide",
    address: {
      streetAddress: "",
      addressLocality: "Tashkent",
      addressRegion: "",
      postalCode: "",
      addressCountry: "UZ",
    },
    // Opening hours (24/7 support). Adjust as needed.
    openingHours: "Mo-Su 00:00-23:59",
  },
  social: {
    twitter: "https://twitter.com/asossoft",
    github: "https://github.com/asossoft",
    linkedin: "https://linkedin.com/company/asossoft",
    dribbble: "https://dribbble.com/asossoft",
  },
  creator: "@asossoft",
  twitterHandle: "@asossoft",
} as const;

export type SiteConfig = typeof siteConfig;
