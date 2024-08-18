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
  <div
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle"
    class="bg-surface p-5 rounded-md">

    <h2 class="text-xl flex items-center">
      <u-icon :name="props.icon" class="me-2" />
      <span>
        {{ props.title }}
      </span>
    </h2>

    <h3 v-if="props.subtitle" class="text-lg mt-1">
      {{ props.subtitle }}
    </h3>

    <p v-if="props.text" class="mt-4">
      {{ props.text }}
    </p>

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

  </div>
</template>