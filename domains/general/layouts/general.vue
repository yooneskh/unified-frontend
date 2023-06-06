<script setup>

const router = useRouter();
const route = useRoute();


/* template */

import GeneralHeader from '../atoms/general-header.vue';

</script>


<template>
  <v-layout>

    <general-header
      v-if="!$route.meta.hideHeader"
    />

    <v-main>
      <slot />
    </v-main>

  </v-layout>
</template>