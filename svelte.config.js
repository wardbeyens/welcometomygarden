import adapter from '@sveltejs/adapter-static'; // https://www.npmjs.com/package/@sveltejs/adapter-static

import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // https://stackoverflow.com/a/74222951/4973029
    alias: {
      $routes: './src/routes',
      $locales: './src/locales'
    },
    adapter: adapter({
      pages: 'dist',
      assets: 'dist'
    }),

    prerender: {
      crawl: true,
      entries: [
        '*',
        '/chat/[name]/[chatId]',
        '/explore/garden/[gardenId]',
        '/become-superfan/payment/[id]'
      ]
    }
  },
  onwarn: (warning) => {
    // https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#config-file-resolving
    if (warning.code === 'security-anchor-rel-noreferrer') return;
  }
};

export default config;
