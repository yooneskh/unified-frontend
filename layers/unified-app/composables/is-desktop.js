import { useDisplay } from 'vuetify';


export function isDesktop() {
  return computed(() =>
    useDisplay().mdAndUp.value
  );
}
