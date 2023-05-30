import { useDisplay } from 'vuetify';


export function isTablet() {
  return computed(() =>
    useDisplay().sm.value
  );
}
