/**
 * Static placeholder data — used until Sanity CMS is connected.
 * When the CMS is live, replace calls to these with the Sanity queries
 * defined in src/lib/sanity/queries.ts.
 */

import type { Project, Experience, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Enes",
  headline: "Full-Stack Developer",
  subheadline: "Building purposeful digital experiences.",
  bio: "I design and build web applications with a focus on performance, clarity, and craft.",
  email: "hello@enes.dev",
  socials: [
    { platform: "GitHub",   url: "https://github.com/" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/" },
    { platform: "Twitter",  url: "https://twitter.com/" },
  ],
  seoDescription:
    "Enes — Full-Stack Developer specializing in modern web applications.",
};

export const projects: Project[] = [
  {
    _id: "1",
    title: "Project Alpha",
    slug: "project-alpha",
    description: "A placeholder project. Replace with real data via Sanity.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    coverImage: "/portfolyo-fotograf.png",
    featured: true,
    publishedAt: "2024-01-01",
  },
];

export const experiences: Experience[] = [
  {
    _id: "1",
    company: "Company Name",
    role: "Software Developer",
    startDate: "2023-01-01",
    description: "Placeholder experience. Replace with real data.",
    technologies: ["React", "Node.js"],
  },
];
