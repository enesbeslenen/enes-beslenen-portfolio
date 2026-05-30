/**
 * GROQ queries — placeholders for when Sanity is connected.
 * Each query maps 1-to-1 with a type in src/types/index.ts.
 */

export const projectsQuery = `
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    tags,
    "coverImage": coverImage.asset->url,
    liveUrl,
    githubUrl,
    featured,
    publishedAt
  }
`;

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    "coverImage": coverImage.asset->url,
    liveUrl,
    githubUrl
  }
`;

export const experiencesQuery = `
  *[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    role,
    startDate,
    endDate,
    description,
    technologies
  }
`;

export const siteConfigQuery = `
  *[_type == "siteConfig"][0] {
    name,
    headline,
    subheadline,
    bio,
    email,
    socials,
    seoDescription
  }
`;
