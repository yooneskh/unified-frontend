

export default defineNuxtConfig({
  extends: [
    './utilities/unified-app/',
    './utilities/unified-network/',
  ],
  routeRules: {
    '/admin/**': { ssr: false },
  },
});
