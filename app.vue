<script setup>

/* authentication */

import { useToken, useUser } from './modules/authentication/state';
import { http } from './services/http/mod';
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


watch(token, () => {
  http.applyHeader('Authorization', token.value);
}, { immediate: true })


/* display breakpoints */

import { useDisplay } from 'vuetify/lib/framework.mjs';
const display = useDisplay();

provide('$mobile', computed(() => display.smAndDown.value));
provide('$tablet', computed(() => display.mdAndDown.value && !display.smAndDown.value));
provide('$desktop', computed(() => display.lgAndUp.value));

</script>


<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>


<style lang="scss">
  .v-btn {
    text-transform: none !important;
  }
</style>