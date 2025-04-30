import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import imgAttr from 'remark-imgattr';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    fallback: {
      en: "ja"
    }
  },
  routing: {
    prefixDefaultLocale: true
  },
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [
      'remark-breaks',
      imgAttr
    ],
    rehypePlugins: [
      ['rehype-add-classes', {
        h1: 'my-4 text-3xl',
        h2: 'my-4 text-2xl',
        ul: 'list-disc list-inside space-y-2',
        li: 'my-2',
        p: 'my-2'
      }],
    ],
  },
});