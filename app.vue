<script setup>

const http = useHttp();

import { AppConfig } from '~/app-config';


/* seo */


useHead({
  titleTemplate: t => `${t ? `${t} - ` : ''}${AppConfig.brand.title}`,
});


/* authentication */

const token = useToken();
const loading = ref(false);


if (token.value) {
  loading.value = true;
  (reloadUser(true)
    .catch((error) => {
      console.error(error);
      token.value = '';
    })
    .finally(() => {
      loading.value = false;
    })
  );
}


watch(token, () => {
  http.applyHeader('Authorization', token.value);
}, { immediate: true });


/* dark mode */

const { activeThemeName } = useAnu();
const isDarkMode = useDarkMode();

watchEffect(() => {
  activeThemeName.value = isDarkMode.value ? 'dark' : 'light';
});

</script>


<template>

  <template v-if="loading">
    <div class="h-screen flex flex-col items-center justify-center">
      <img
        src="/logo-small.webp"
        class="w-40px h-40px"
      />
      <a-spinner
        class="mt-3 text-primary"
      />
    </div>
  </template>

  <template v-else>
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </template>

  <unified-toasts-provider />
  <unified-dialogs-provider />

</template>


<style>

  /* @import '@/assets/stylesheets/rtl.css'; */

  .rtl {
    direction: rtl;
  }

  .ltr {
    direction: ltr;
  }


  .a-table-table-th {
    text-align: unset;
  }

</style>