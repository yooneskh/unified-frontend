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


/* uuid */

provide('makeUuid', (sections = 4) => {
  return (
    new Array(sections)
      .fill()
      .map(() => Math.random().toString(16).slice(2))
      .join('-')
  );
});


/* date format */

import dayjs from 'dayjs';
import jalaliDay from 'jalaliday';

dayjs.extend(jalaliDay);

provide('formatDate', (timestamp, format = 'YYYY/MM/DD HH:mm', calendar = 'gregory' /* jalali */, locale = 'en') => {
  return dayjs(timestamp).calendar(calendar).locale(locale).format(format);
});

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

</style>