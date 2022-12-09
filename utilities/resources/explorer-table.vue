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

const itemsInPage = ref(10);
const currentPage = ref(1);


const { loading, data: items, refresh: refreshItemsData } = useNetwork({
  method: 'get',
  url: computed(() =>
    `${resourceUrlPart.value}/`
  ),
  queries: computed(() => ({
    skip: (currentPage.value - 1) * itemsInPage.value,
    limit: itemsInPage.value,
  })),
});

const { loading: countLoading, data: itemsCount, refresh: refreshItemsCount } = useNetwork({
  method: 'get',
  url: computed(() =>
    `${resourceUrlPart.value}/count`
  ),
  // queries: computed(() => ({
  //   filters: ...
  // })),
});


function refreshItems() {
  refreshItemsData();
  refreshItemsCount();
}


watch([loading, countLoading], () =>
  emit('update:loading', loading.value || countLoading.value)
);


/* actions */

import { generalHttpHandle, http } from '~~/services/http/mod';

import { launchButtonPickerDialog } from '../unified-dialogs-vuetify/button-picker/mod';

const actions = [
  {
    key: 'update',
    icon: 'mdi-pen',
    title: 'Update',
    handler: handleItemUpdate,
  },
  {
    key: 'delete',
    color: 'error',
    icon: 'mdi-delete',
    title: 'Delete',
    handler: handleItemDelete,
  },
];


async function handleItemDelete(item) {

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


import { launchDialog } from '~~/services/dialogs/mod';
import ResourceObjectDialog from './object-dialog.vue';

async function handleItemUpdate(item) {

  const result = await launchDialog({
    component: ResourceObjectDialog,
    props: {
      resource: props.resource,
      resourceId: item._id,
      resourceObject: item,
    },
  });

  if (!result) {
    return;
  }


  refreshItemsData();

}


/* template */

import SimpleTable from './components/simple-table.vue';
import ExplorerTableCell from './explorer-table-cell.vue';


/* expose */

defineExpose({
  refreshItems,
  refreshItemsData,
  refreshItemsCount,
});

</script>


<template>
  <div class="explorer-table">

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

    <div class="pa-3 d-flex align-start">

      <v-pagination
        size="small"
        density="comfortable"
        :length="Math.ceil(itemsCount / itemsInPage) || 1"
        total-visible="9"
        v-model="currentPage"
      />

      <v-spacer />

      <v-select
        variant="outlined"
        density="compact"
        class="flex-grow-0"
        :items="[5, 10, 15, 30]"
        v-model="itemsInPage"
        @update:model-value="currentPage = 1"
        hide-details>
        <template #prepend>
          <div class="text-caption">
            Items to show
          </div>
        </template>
      </v-select>

    </div>

  </div>
</template>