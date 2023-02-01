<script setup>

/* authentication */

const token = inject('token');
const user = inject('user');

const loading = ref(false);


import { loadUserWithToken } from './modules/authentication/controller';

if (token.value) {

  loading.value = true;

  (loadUserWithToken(token.value, token, user, true)
    .catch(() => {
      token.value = '';
    })
    .finally(() => {
      loading.value = false;
    })
  );

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

    <template v-if="loading">
      <div class="h-100 d-flex flex-column align-center justify-center">

        <v-img
          src="/logo.png"
          width="56"
          height="56"
          class="flex-grow-0"
        />

        <v-progress-circular
          indeterminate
          color="primary"
          size="24"
          class="mt-3"
        />

      </div>
    </template>
    <template v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>

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

  .text-ltr {
    direction: ltr;
  }

  .text-rtl {
    direction: rtl;
  }

  .gap-1 {
    gap: 4px;
  }

  .gap-2 {
    gap: 8px;
  }

</style>