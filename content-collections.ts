import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z } from "zod";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const articleSchema = z.object({
  type: z.literal('article'),
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  author: z.string(),
})
const videoSchema = z.object({
  type: z.literal('video'),
  title: z.string(),
  date: z.coerce.date(),
  youtubeVideoId: z.string(),
})
const schema = z.discriminatedUnion('type', [articleSchema, videoSchema])
const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '*.md',
  schema,
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document)
    return {
      ...document,
      id: document._meta.path,
      html,
    }
  },
})

export default defineConfig({
  collections: [posts],
});
