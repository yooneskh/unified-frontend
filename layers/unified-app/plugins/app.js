import { useDisplay } from 'vuetify';


export default defineNuxtPlugin(nuxtApp => {

  /* display breakpoints */

  nuxtApp.vueApp.provide('globalBreakpoints', computed(() => ({
    xs: useDisplay().thresholds.value.sm,
    sm: useDisplay().thresholds.value.md,
    md: useDisplay().thresholds.value.lg,
    lg: useDisplay().thresholds.value.xl,
    xl: useDisplay().thresholds.value.xxl,
  })));

});
