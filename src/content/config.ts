import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
  }),
});

const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    category: z.string(),
    summary: z.string(),
    result: z.string(),
    coverImage: z.string(),
    year: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string(),
    category: z.string(),
    coverImage: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    readTime: z.number(),
  }),
});

export const collections = {
  services: servicesCollection,
  'case-studies': caseStudiesCollection,
  blog: blogCollection,
};
