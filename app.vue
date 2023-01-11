<script setup>

/* authentication */

const token = inject('token');
const user = inject('user');


import { loadUserWithToken } from './modules/authentication/controller';

if (token.value) {
  try {
    await loadUserWithToken(token.value, token, user, true);
  }
  catch {
    token.value = '';
  }
}


const http = inject('http');

watch(token, () => {
  http.applyHeader('Authorization', token.value);
}, { immediate: true })


/* display breakpoints */

import { useDisplay } from 'vuetify/lib/framework.mjs';
const display = useDisplay();

provide('isMobile', computed(() => display.smAndDown.value));
provide('isTablet', computed(() => display.mdAndDown.value && !display.smAndDown.value));
provide('isDesktop', computed(() => display.lgAndUp.value));


/* unified dialogs */

import { UnifiedDialogProvider } from './utilities/unified-dialogs/mod';

</script>


<template>
  <v-app>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <unified-dialog-provider />

  </v-app>
</template>


<style lang="scss">

  @import '@/assets/stylesheets/rtl.scss';

  .v-btn {
    text-transform: none !important;
  }

  .v-messages__message + .v-messages__message {
    margin-top: 6px;
  }

</style>