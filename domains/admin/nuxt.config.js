

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  routeRules: {
    '/admin/**': { ssr: false },
  },
});
