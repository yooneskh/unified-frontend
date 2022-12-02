<script setup>

/* interface */

const props = defineProps({
  header: Object,
  data: {},
});

const emit = defineEmits([]);


/* template */

import ExplorerTableCellResource from './explorer-table-cell-resource.vue';

</script>


<template>
  <template v-if="props.header.ref">
    <explorer-table-cell-resource
      v-if="data"
      :resource="props.header.ref"
      :resource-id="data"
    />
  </template>
  <template v-else-if="props.header.type === 'number'">
    {{ (typeof props.data === 'number') ? (props.data.toLocaleString()) : (props.data) }}
  </template>
  <template v-else>
    {{ props.data }}
  </template>
</template>