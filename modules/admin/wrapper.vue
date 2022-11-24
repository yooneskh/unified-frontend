<script setup>

import { ref } from 'vue';
const router = useRouter();
const route = useRoute();


/* template */

import AdminHeader from './header.vue';

</script>


<template>
  <v-layout>

    <admin-header />

    <v-main>
      <NuxtPage />
    </v-main>

  </v-layout>
</template>