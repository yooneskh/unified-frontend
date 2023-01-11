<script setup>

const router = useRouter();
const route = useRoute();

/* template */

import GeneralHeader from './header.vue';

</script>


<template>
  <v-layout>

    <general-header
      v-if="!$route.meta.hideHeader"
    />

    <v-main>
      <NuxtPage />
    </v-main>

  </v-layout>
</template>