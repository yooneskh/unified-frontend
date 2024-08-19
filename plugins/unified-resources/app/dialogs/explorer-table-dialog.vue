<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  headers: Array,
  items: Array,
  actions: Array,
});

const emit = defineEmits([
  'resolve',
]);


/* template */

import ExplorerTableCell from '../atoms/explorer-table-cell.vue';

</script>


<template>
  <u-card
    :icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle"
    :text="props.text">

    <u-table
      :headers="props.headers"
      :items="props.items"
      :actions="props.actions"
      class="mt-4">
      <template #item="{ header, data }">
        <explorer-table-cell
          :header="header"
          :data="data"
        />
      </template>
    </u-table>

  </u-card>
</template>