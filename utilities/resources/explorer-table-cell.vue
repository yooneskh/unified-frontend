<script setup>

/* interface */

const props = defineProps({
  header: Object,
  data: {},
});

const emit = defineEmits([]);


/* template */

import dayjs from 'dayjs';

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
    {{ dayjs(data).format(props.header.labelFormat) }}
  </template>

  <template v-else-if="props.header.type === 'boolean'">
    <template v-if="data">
      <v-icon color="success" icon="mdi-check" />
    </template>
    <template v-else>
      <v-icon color="error" icon="mdi-close" />
    </template>
  </template>

  <template v-else-if="props.header.type === 'number'">
    {{ (typeof props.data === 'number') ? (props.data.toLocaleString()) : (props.data) }}
  </template>

  <template v-else>
    {{ props.data }}
  </template>

</template>