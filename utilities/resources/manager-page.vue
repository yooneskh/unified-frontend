<script setup>

const router = useRouter();
const route = useRoute();


/* template */

import ManagerCard from './manager-card.vue';

import startCase from 'lodash/startCase';

</script>


<template>
  <v-container fluid>
    <client-only>
      <manager-card
        :icon="route.meta.icon || 'mdi-table'"
        :title="route.meta.title || `Manage ${startCase(route.meta.resource)}s`"
        :resource="route.meta.resource"
      />
    </client-only>
  </v-container>
</template>