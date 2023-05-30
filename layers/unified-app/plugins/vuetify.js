import { createVuetify } from 'vuetify';


export default defineNuxtPlugin(nuxtApp => {

  let ssr = true;

  if (!nuxtApp.ssrContext?.event?.node?.req?.headers?.['user-agent']?.toLowerCase().includes('mobi')) {
    ssr = {
      clientWidth: 1281,
    };
  }

  const vuetify = createVuetify({
    ssr,
    defaults: {
      VBtn: {
        class: 'text-none',
      },
      VCardTitle: {
        class: 'text-wrap',
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);

});
