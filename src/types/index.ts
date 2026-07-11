/**
 * Shared domain types used across sections and data.
 */
import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  year: number;
  cover: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
