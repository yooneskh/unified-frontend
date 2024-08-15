

export default defineNuxtConfig({
  devtools: false,
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  experimental: {
    headNext: true,
  },
  extends: [
    '../unified-dialogs-common',
    '../unified-dialogs',
    '../unified-toasts',
    '../unified-forms',
    '../unified-network',
    'unified-components',
  ],
  modules: [
    'nuxt-typed-router',
  ],
});
