/**
 * Navigation structure — used by the header, footer, and mobile menu.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Technologies", href: "/technologies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavGroup[] = [
  {
    title: "Quick Links",
    items: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Website Development", href: "/services/website-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "CRM Development", href: "/services/crm-development" },
      { label: "Cloud Deployment", href: "/services/cloud-deployment" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
  },
];

export const ctaConfig = {
  label: "Get Quote",
  href: "/contact",
} as const;

/**
 * Whether `href` is the active route for `pathname`.
 * "/" matches only the exact home path; others match nested routes too.
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
