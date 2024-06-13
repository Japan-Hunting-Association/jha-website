// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a schema for each collection you'd like to validate.
const topicCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z.date().optional(),
    author: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    cover: image(),
    coverAlt: z.string(),
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  topic: topicCollection,
};