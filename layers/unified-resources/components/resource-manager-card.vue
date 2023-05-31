<script setup>

const http = useHttp();


/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
  extraObjectActions: Array,
});

const emit = defineEmits([]);


/* meta */

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});


/* general */

const loading = ref(false);
const elExplorer = ref();


/* create */

async function handleCreate() {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
  });

  if (!result) {
    return;
  }


  elExplorer.value?.refreshItems();

}


/* table actions */

const tableActions = [
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
  ...(props.extraObjectActions ?? []),
];


async function handleItemDelete(item) {

  launchButtonPickerDialog({
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
        async handler() {

          loading.value = true;
          const { status, data } = await http.request({
            method: 'delete',
            url: `/${resourceUrlPart.value}/${item._id}`,
          });
          loading.value = false;

          if (generalHttpHandle(status, data)) {
            return;
          }


          refreshItems();

        }
      },
    ],
  });

}


async function handleItemUpdate(item) {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
    resourceId: item._id,
  });

  if (!result) {
    return;
  }


  refreshItemsData();

}


/* actions */

function refreshItems() {
  elExplorer.value.refreshItems();
}

function refreshItemsData() {
  elExplorer.value.refreshItemsData();
}


/* expose */

defineExpose({
  refreshItems,
  refreshItemsData,
});


/* template */

import startCase from 'lodash/startCase';
import pluralize from 'pluralize';

</script>


<template>
  <v-card :prepend-icon="props.icon" :title="props.title ?? `Manage ${startCase(pluralize(props.resource))}`" :loading="loading">

    <template #append>
      <v-btn flat color="primary" prepend-icon="mdi-plus" @click="handleCreate()">
        Create New
      </v-btn>
    </template>

    <resource-explorer-table
      ref="elExplorer"
      :resource="props.resource"
      :actions="tableActions"
      @update:loading="loading = $event"
    />

  </v-card>
</template>