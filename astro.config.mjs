import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import imgAttr from 'remark-imgattr';
import path from 'path';
import { fileURLToPath } from 'url';
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
  integrations: [tailwind(), react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')
      }
    }
  },
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