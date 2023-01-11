import vuetify from 'vite-plugin-vuetify'
import { routes } from '../../routes';


export default defineNuxtConfig({
  css: [
    'vuetify/dist/vuetify.min.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: [
      'unified-form',
      'unified-form-vuetify'
    ]
  },
  vite: {
    ssr: {
      noExternal: [
        'vuetify',
      ],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: [
    async (_, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ));
    },
  ],
  imports: {
    dirs: [
      '../unified-network',
      './plugins',
    ],
  },
  pages: true,
  hooks: {
    'pages:extend'(pages) {
      pages.push(...routes);
    },
  },
});
