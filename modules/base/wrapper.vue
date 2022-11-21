<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* template */

import BaseHeader from './header.vue';

</script>


<template>
  <v-layout>

    <base-header />

    <v-main>
      <NuxtPage />
    </v-main>

  </v-layout>
</template>