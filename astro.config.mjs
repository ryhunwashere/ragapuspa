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
  },

  vite: {
    define: {
      'process.env.CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
      'process.env.CLOUDINARY_API_KEY': JSON.stringify(process.env.CLOUDINARY_API_KEY),
      'process.env.CLOUDINARY_API_SECRET': JSON.stringify(process.env.CLOUDINARY_API_SECRET),
      'process.env.CLOUDINARY_FOLDER_GALLERY': JSON.stringify(process.env.CLOUDINARY_FOLDER_GALLERY),
      'process.env.CLOUDINARY_FOLDER_MUSIC_TRACK': JSON.stringify(process.env.CLOUDINARY_FOLDER_MUSIC_TRACKS),
      'process.env.CLOUDINARY_FOLDER_MUSIC_ARTWORKS': JSON.stringify(process.env.CLOUDINARY_FOLDER_MUSIC_ARTWORKS)
    }
  }
});