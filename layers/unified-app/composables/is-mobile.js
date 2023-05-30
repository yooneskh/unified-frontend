import { useDisplay } from 'vuetify';


export function isMobile() {
  return computed(() =>
    useDisplay().xs.value
  );
}
