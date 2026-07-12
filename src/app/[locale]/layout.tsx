import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { MotionProvider } from "@/providers/motion-provider";
import { I18nProvider } from "@/providers/i18n-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, webSiteSchema, localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import {
  locales,
  defaultLocale,
  isLocale,
  localeHtmlLang,
  withLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Pre-render one static page per locale. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  // Per-locale canonical + hreflang alternates for SEO.
  const languages = Object.fromEntries(
    locales.map((l) => [localeHtmlLang[l], withLocale(l, "/")])
  );

  return {
    metadataBase: new URL(siteConfig.url),
    manifest: "/manifest.webmanifest",
    title: {
      default: dict.metadata.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: dict.metadata.description,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.legalName,
    category: "technology",
    alternates: {
      canonical: withLocale(locale, "/"),
      languages,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale,
      url: withLocale(locale, "/"),
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      site: siteConfig.twitterHandle,
      creator: siteConfig.creator,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

  return (
    <html lang={localeHtmlLang[locale]} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* Skip link for keyboard & screen-reader users */}
        <a
          href="#main-content"
          className="sr-only rounded-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider locale={locale} dict={dict}>
            <MotionProvider>{children}</MotionProvider>
          </I18nProvider>
        </ThemeProvider>

        {/* Site-wide structured data */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={webSiteSchema(locale)} />
      </body>
    </html>
  );
}
