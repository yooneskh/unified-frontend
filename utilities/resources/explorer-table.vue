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

import { useEnrichedMeta } from './composeables/use-meta';

const { meta } = useEnrichedMeta({
  resource: computed(() => props.resource),
  filter: it => !it.hideInTable,
});


/* headers */

const headers = computed(() =>
  meta.value
);


/* items */

import { useNetwork } from './composeables/use-network';

const { loading, data: items, refresh: refreshItems } = useNetwork({
  method: 'get',
  url: computed(() =>
    `${resourceUrlPart.value}/`
  ),
  queries: {
    limit: 100,
  },
});


watch(loading, () =>
  emit('update:loading', loading.value)
);


/* actions */

import { generalHttpHandle, http } from '~~/services/http/mod';

import { launchButtonPickerDialog } from '../unified-dialogs-vuetify/button-picker/mod';

const actions = [
  {
    key: 'update',
    icon: 'mdi-pen',
    title: 'Update',
    handler(item, index) {
      console.log({ item, index });
    },
  },
  {
    key: 'delete',
    color: 'error',
    icon: 'mdi-delete',
    title: 'Delete',
    handler: handleItemDelete,
  },
];


async function handleItemDelete(item, index) {

  const choice = await launchButtonPickerDialog({
    icon: 'mdi-delete',
    title: `Delete ${props.resource}`,
    text: 'Are you sure you want to delete this?',
    startButtons: [
      {
        value: false,
        title: 'No, Cancel',
      },
    ],
    endButtons: [
      {
        value: true,
        title: 'Yes, Delete this',
        color: 'error',
      },
    ],
  });

  if (!choice) {
    return;
  }

  const { status, data } = await http.request({
    method: 'delete',
    url: `/${resourceUrlPart.value}/${item._id}`,
  });

  if (generalHttpHandle(status, data)) {
    return;
  }

  alert(`${props.resource} deleted successfully.`);
  refreshItems();

}


/* template */

import SimpleTable from './components/simple-table.vue';
import ExplorerTableCell from './explorer-table-cell.vue';

</script>


<template>
  <simple-table
    :headers="headers"
    :items="items"
    :actions="actions">

    <template #item="{ header, data }">
      <explorer-table-cell
        :header="header"
        :data="data"
      />
    </template>

  </simple-table>
</template>