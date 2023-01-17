<script setup>

const router = useRouter();
const route = useRoute();


/* interface */

const props = defineProps({
  extraObjectActions: Array,
});


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
      :extra-object-actions="props.extraObjectActions"
    />
  </v-container>
</template>