import vuetify from 'vite-plugin-vuetify'


export default defineNuxtConfig({
  extends: [
    '../unified-form',
    '../unified-network',
    '../unified-dialogs',
    '../unified-dialogs-vuetify',
    '../unified-toasts-vuetify',
  ],
  css: [
    'vuetify/dist/vuetify.min.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: [
      'unified-form',
      'unified-form-vuetify',
    ],
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
        vuetify(),
      ));
    },
  ],
});
