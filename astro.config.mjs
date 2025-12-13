// @ts-check
import { defineConfig } from 'astro/config';
import { firstSongSlug } from './src/scripts/generateVercelConfig';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  redirects: {
    '/music': {
      status: 301,
      destination: `/music/${firstSongSlug}`
    }
  }
});