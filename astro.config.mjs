import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jagofps.github.io',
  base: '/synthex-ai-agency',
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  },
});
