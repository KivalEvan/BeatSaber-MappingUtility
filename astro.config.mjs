import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
   site: 'https://kivalevan.me',
   base: '/BeatSaber-MappingUtility',
   integrations: [solidJs()],
   vite: {
      resolve: {
         alias: {
            'node:path': 'src/empty-polyfills.js',
            'node:fs/promises': 'src/empty-polyfills.js',
            'node:fs': 'src/empty-polyfills.js',
         },
      },
   },
});
