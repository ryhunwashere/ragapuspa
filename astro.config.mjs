// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import cards from './src/data/cards.json';

const firstSongSlug = cards[0].slug;

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [svelte()],

  redirects: {
    '/music': {
      status: 301,
      destination: `/music/${firstSongSlug}`
    }
  }
});