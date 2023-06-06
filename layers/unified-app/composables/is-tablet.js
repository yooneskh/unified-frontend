import { useDisplay } from 'vuetify';


export const isTablet = computed(() =>
  useDisplay().sm.value
);
