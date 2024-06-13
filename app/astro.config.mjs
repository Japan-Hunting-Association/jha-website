import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

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
  integrations: [tailwind()]
});