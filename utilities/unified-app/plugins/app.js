import { useDisplay } from 'vuetify';


export default defineNuxtPlugin(nuxtApp => {

  /* display breakpoints */

  nuxtApp.vueApp.provide('isMobile', computed(() => useDisplay().xs.value));
  nuxtApp.vueApp.provide('isTablet', computed(() => useDisplay().sm.value));
  nuxtApp.vueApp.provide('isDesktop', computed(() => useDisplay().mdAndUp.value));

  nuxtApp.vueApp.provide('globalBreakpoints', computed(() => ({
    xs: useDisplay().thresholds.value.sm,
    sm: useDisplay().thresholds.value.md,
    md: useDisplay().thresholds.value.lg,
    lg: useDisplay().thresholds.value.xl,
    xl: useDisplay().thresholds.value.xxl,
  })));

});
