

export default defineNuxtConfig({
  extends: [
    './domains/authentication',
    './domains/general',
    './domains/admin',
    './layers/unified-app',
    './layers/unified-resources',
  ],
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  routeRules: {
    '/admin/**': { ssr: false },
  },
});
