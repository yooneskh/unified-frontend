<script setup>

const router = useRouter();
const route = useRoute();


/* template */

import ManagerCard from './manager-card.vue';

import startCase from 'lodash/startCase';

</script>


<template>
  <v-container fluid>
    <manager-card
      :icon="route.meta.icon || 'mdi-table'"
      :title="route.meta.title || `Manage ${startCase(route.meta.resource)}s`"
      :resource="route.meta.resource"
    />
  </v-container>
</template>