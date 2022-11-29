<script setup>

/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
});

const emit = defineEmits([]);


/* general */

const loading = ref(false);


/* template */

import ExplorerTable from './explorer-table.vue';

</script>


<template>
  <v-card :prepend-icon="props.icon" :title="props.title" :loading="loading">

    <explorer-table
      :resource="props.resource"
      @update:loading="loading = $event"
    />

  </v-card>
</template>