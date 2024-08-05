

export default defineNuxtConfig({
  devtools: false,
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  experimental: {
    headNext: true,
  },
  extends: [
    '../unified-toasts',
    '../unified-network',
    'unified-components',
  ],
});
