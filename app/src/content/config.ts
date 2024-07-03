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
const houseCollection = defineCollection({
  schema: ({ image }) => z.object({
    name: z.string().optional(),
    tags: z.array(z.string()).optional(),
    equipments: z.array(z.string()).optional(),
    pubDate: z.date().optional(),
    owner: z.string().optional(),
    cover: image(),
    coverAlt: z.string().optional(),
    booking: z.string().optional(),
    contact: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    map_embed: z.string().optional()
  })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  topic: topicCollection,
  house: houseCollection,
};