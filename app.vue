<script setup>


/* authentication */

const token = useToken();
const loading = ref(false);


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


watch(token, () => {
  useHttp().applyHeader('Authorization', token.value);
}, { immediate: true })

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

    <unified-dialogs-provider />
    <unified-toasts-provider />

  </v-app>
</template>


<style lang="scss">

  @import '@/assets/stylesheets/rtl.scss';

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

</style>