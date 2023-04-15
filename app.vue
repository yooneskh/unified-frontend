<script setup>

/* authentication */

const token = inject('token');
const user = inject('user');

const loading = ref(false);


import { loadUserWithToken } from './modules/authentication/controller';

async function reloadUser(silent = false) {
  await loadUserWithToken(token.value, token, user, silent);
}

provide('reloadUser', reloadUser);


if (token.value) {
  loading.value = true;
  (reloadUser(true)
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

provide('globalBreakpoints', computed(() => ({
  xs: display.thresholds.value.sm,
  sm: display.thresholds.value.md,
  md: display.thresholds.value.lg,
  lg: display.thresholds.value.xl,
  xl: display.thresholds.value.xxl,
})));


/* unified dialogs */

import { UnifiedDialogProvider } from './utilities/unified-dialogs/mod';
import { UnifiedToastsProvider } from './utilities/unified-toasts/mod';

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
    <unified-toasts-provider />

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

  .gap-3 {
    gap: 12px;
  }

  .v-card-title {
    white-space: normal;
  }

</style>