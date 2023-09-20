<script setup>


/* interface */

const props = defineProps({
  header: Object,
  data: {},
});

const emit = defineEmits([

]);


/* template */

import ExplorerTableCellResource from './explorer-table-cell-resource.vue';

</script>


<template>

  <template v-if="props.header.variants">
    <template v-for="(headerExtra, variant) of props.header.variants" :key="variant">
      <span class="text-decoration-underline me-2">
        {{ variant }}:
        <explorer-table-cell
          v-if="props.data[variant]"
          :header="{ ...props.header, ...(headerExtra || {}), variants: undefined }"
          :data="props.data[variant]"
        />
      </span>
    </template>
  </template>

  <template v-else-if="props.header.array">
    <template v-for="(item, index) of data" :key="item?._id || index">
      <explorer-table-cell
        v-if="item"
        :header="{ ...props.header, array: false }"
        :data="item"
      />
    </template>
  </template>

  <template v-else-if="props.header.ref">
    <explorer-table-cell-resource
      v-if="data"
      :resource="props.header.ref"
      :resource-id="data"
    />
  </template>

  <template v-else-if="props.header.labelFormat">
    {{ !data ? '' : formatDate(data, props.header.labelFormat) }}
  </template>

  <template v-else-if="props.header.type === 'boolean'">
    <template v-if="data">
      <a-icon color="success" icon="i-bx-check" />
    </template>
    <template v-else>
      <a-icon color="danger" icon="i-bx-x" />
    </template>
  </template>

  <template v-else-if="props.header.type === 'number'">
    {{ (typeof props.data === 'number') ? (props.data.toLocaleString()) : (props.data) }}
  </template>

  <template v-else>
    {{ props.data }}
  </template>

</template>