<script setup>

/* interface */

const props = defineProps({
  resource: String,
  loading: Boolean,
});

const emit = defineEmits([
  'update:loading',
]);


/* shared */

import { useResourceUrl } from './composeables/use-resource-url';

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});


/* meta */

import { useMeta } from './composeables/use-meta';

const { meta } = useMeta({
  resource: computed(() => props.resource),
});


/* headers */

const headers = computed(() =>
  meta.value
);


/* items */

import { useNetwork } from './composeables/use-network';

const { loading, data: items } = useNetwork({
  method: 'get',
  url: computed(() =>
    `${resourceUrlPart.value}/`
  ),
});


watch(loading, () =>
  emit('update:loading', loading.value)
);


/* template */

import SimpleTable from './components/simple-table.vue';
import ExplorerTableCell from './explorer-table-cell.vue';

</script>


<template>
  <simple-table
    :headers="headers"
    :items="items">

    <template #item="{ header, data }">
      <explorer-table-cell
        :header="header"
        :data="data"
      />
    </template>

  </simple-table>
</template>