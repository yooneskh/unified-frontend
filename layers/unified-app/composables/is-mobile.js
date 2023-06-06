import { useDisplay } from 'vuetify';


export const isMobile = computed(() =>
  useDisplay().xs.value
);
