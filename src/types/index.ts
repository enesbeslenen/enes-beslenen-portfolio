/**
 * Core data types for the portfolio.
 * These mirror what Sanity CMS will return when integrated.
 * Add / extend as content grows.
 */

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  tags: string[];
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  publishedAt: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;       // undefined = "present"
  description: string;
  technologies: string[];
}

export interface Skill {
  _id: string;
  name: string;
  category: "frontend" | "backend" | "tool" | "other";
  level: number;          // 1–5
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  name: string;
  headline: string;
  subheadline: string;
  bio: string;
  email: string;
  socials: SocialLink[];
  seoDescription: string;
}
