

export default defineNuxtConfig({
  extends: [
    '../unified-network',
    '../unified-dialogs',
    '../unified-dialogs-common',
    '../unified-toasts',
    '../unified-form',
    '../unified-form-anu',
    '../unified-resources',
  ],
  vue: {
    defineModel: true,
  },
  experimental: {
    headNext: true
  },
  modules: [
    '@anu-vue/nuxt',
    '@unocss/nuxt',
  ],
  anu: {
    propsDefaults: {
      ABtn: {
        color: '',
      }
    },
    themes: {
      light: {
        colors: {
          primary: '198, 72%, 53%',
        },
      },
      dark: {
        colors: {
          primary: '198, 72%, 53%',
        },
      },
    },
  },
});
