

export default defineNuxtConfig({
  extends: './utilities/unified-app/',
  routeRules: {
    '/admin/**': { ssr: false },
  },
});
