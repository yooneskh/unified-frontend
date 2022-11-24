<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* template */

import GeneralHeader from './header.vue';

</script>


<template>
  <v-layout>

    <general-header />

    <v-main>
      <NuxtPage />
    </v-main>

  </v-layout>
</template>