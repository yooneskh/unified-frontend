<script setup>

/* auth */

import { useToken, useUser } from './modules/authentication/state';

const token = useToken();
const user = useUser();

provide('token', token);
provide('user', user);


/* http authentication */

import { $http } from './services/http/mod';

watch(token, () => {
  if (token.value) {
    $http.base.headers['Authorization'] = token.value;
  }
  else {
    delete $http.base.headers['Authorization'];
  }
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

    <template v-if="false">
      <div class="fill-height d-flex flex-column align-center justify-center">
        <v-progress-circular
          indeterminate
          size="24"
        />
      </div>
    </template>

    <template v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>

  </v-app>
</template>