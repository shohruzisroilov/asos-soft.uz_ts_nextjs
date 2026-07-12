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
    "AsosSoft",
    "sayt yaratish",
    "sayt ochish",
    "sayt tayyorlash",
    "internet do'kon yaratish",
    "bot yaratish",
    "telegram bot yaratish",
    "telegram bot ochish",
    "mobil ilova yaratish",
    "ilova qilish",
    "android ilova yaratish",
    "ios ilova yaratish",
    "dastur yaratish",
    "dasturiy ta'minot yaratish",
    "dasturlash xizmatlari",
    "IT xizmatlari",
    "IT kompaniya",
    "IT studio Toshkent",
    "создание сайтов",
    "создание ботов",
    "создание телеграм ботов",
    "разработка мобильных приложений",
    "создание приложений",
    "разработка ПО",
    "IT услуги Ташкент",
  ],
  contact: {
    email: "devshohruz@gmail.com",
    phone: "+998 94 008 04 73",
    address: "Toshkent, O‘zbekiston · Masofadan",
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
    telegram: "https://t.me/Shohruz_Isroilov",
  },
  creator: "@asossoft",
  twitterHandle: "@asossoft",
} as const;

export type SiteConfig = typeof siteConfig;
