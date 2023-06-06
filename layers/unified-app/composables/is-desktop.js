import { useDisplay } from 'vuetify';


export const isDesktop = computed(() =>
  useDisplay().mdAndUp.value
);
