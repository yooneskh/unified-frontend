<script setup>

/* authentication */

import { useToken, useUser } from './modules/authentication/state';
import { loadUserWithToken } from './modules/authentication/controller';


const token = useToken();
const user = useUser();

provide('token', token);
provide('user', user);


if (token.value) {
  try {
    await loadUserWithToken(token.value, token, user);
  }
  catch {}
}


import { http, generalHttpHandle } from './services/http/mod';

provide('http', http);
provide('generalHttpHandle', generalHttpHandle);


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
import { launchDialog } from './services/dialogs/mod';

provide('launchDialog', launchDialog);

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
  .v-btn {
    text-transform: none !important;
  }
</style>