<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* scroll fix */

onMounted(() => {
  document.body.parentElement.style.overflowY = 'unset';
});

onUnmounted(() => {
  document.body.parentElement.style.overflowY = '';
});


/* template */

import AdminSidebar from './sidebar.vue';

</script>


<template>
  <client-only>
    <v-layout>

      <admin-sidebar />

      <v-main style="max-height: 100vh; overflow-y: auto;">
        <NuxtPage />
      </v-main>

    </v-layout>
  </client-only>
</template>