

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  extends: [
    './domains/general',
    './domains/authentication',
    './domains/admin',
    './plugins/unified-app',
  ],
  unifiedComponents: {
    theme: {
      'surface': '#FAFAFA',
      'on-surface': '#212121',
      'neutral': '#212121',
      'on-neutral': '#FAFAFA',
      'primary': '#3B82F6',
      'on-primary': '#FAFAFA',
      'secondary': '#2DD4BF',
      'on-secondary': '#212121',
      'success': '#22C55E',
      'on-success': '#FAFAFA',
      'warning': '#FFC107',
      'on-warning': '#212121',
      'danger': '#EF4444',
      'on-danger': '#FAFAFA',
    },
  },
});
