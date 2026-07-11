export interface Testimonial {
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number; // 1–5
  /** Optional real image; falls back to a monogram avatar when absent. */
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "Northwind Commerce",
    review:
      "AsosSoft rebuilt our storefront from the ground up and conversions jumped 40% in the first quarter. The team is fast, communicative, and genuinely cares about the outcome.",
    rating: 5,
  },
  {
    name: "Marcus Reid",
    role: "Founder",
    company: "Pulse Fitness",
    review:
      "They shipped our mobile app two weeks ahead of schedule without cutting a single corner. The quality of engineering and design is honestly some of the best we've worked with.",
    rating: 5,
  },
  {
    name: "Elena Petrova",
    role: "Product Lead",
    company: "Vertex Systems",
    review:
      "Our ERP was a mess of legacy tools. AsosSoft unified everything into one clean platform our whole company actually enjoys using. A rare kind of partner.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "CEO",
    company: "Cargo Logistics",
    review:
      "The live tracking dashboard they built transformed our operations. Support has been responsive around the clock — exactly what a growing business needs.",
    rating: 4,
  },
  {
    name: "Aisha Rahman",
    role: "Head of Marketing",
    company: "Bloom Studio",
    review:
      "Beautiful, thoughtful UI and the SEO results speak for themselves — we now rank on page one for our top keywords. Couldn't recommend the team more highly.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "COO",
    company: "Atlas CRM",
    review:
      "A true long-term partner, not just a vendor. They understood our business, proposed smart solutions, and delivered a CRM our sales team relies on every single day.",
    rating: 5,
  },
];
