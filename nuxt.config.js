import vuetify from 'vite-plugin-vuetify'


export default defineNuxtConfig({
  css: [
    'vuetify/dist/vuetify.min.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
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
});
