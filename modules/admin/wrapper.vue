<script setup>

const router = useRouter();
const route = useRoute();


/* scroll fix */

onMounted(() => {
  document.body.parentElement.style.overflowY = 'unset';
});

onUnmounted(() => {
  document.body.parentElement.style.overflowY = '';
});


/* authentication */

const user = useUser();

watch(route, () => {
  if (!user.value || !user.value._id) {
    router.replace({ name: 'authentication.page' });
    return;
  }
}, { immediate: true });


/* template */

import AdminSidebar from './sidebar.vue';

</script>


<template>
  <v-layout>

    <admin-sidebar />

    <v-main style="max-height: 100vh; overflow-y: auto;">
      <NuxtPage />
    </v-main>

  </v-layout>
</template>