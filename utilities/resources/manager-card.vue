<script setup>

const { http, generalHttpHandle } = useHttp();


/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
  extraObjectActions: Array,
});

const emit = defineEmits([]);


/* meta */

import { useResourceUrl } from './composeables/use-resource-url';

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});


/* general */

const loading = ref(false);
const elExplorer = ref();


/* create */

import ResourceObjectDialog from './object-dialog.vue';
const { launchDialog } = useDialog();

async function handleCreate() {

  const result = await launchDialog({
    component: ResourceObjectDialog,
    props: {
      resource: props.resource,
    },
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


import { launchButtonPickerDialog } from '../unified-dialogs-vuetify/button-picker/mod';

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

  const result = await launchDialog({
    component: ResourceObjectDialog,
    props: {
      resource: props.resource,
      resourceId: item._id,
    },
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


/* template */

import ExplorerTable from './explorer-table.vue';


/* expose */

defineExpose({
  refreshItems,
  refreshItemsData,
});

</script>


<template>
  <v-card :prepend-icon="props.icon" :title="props.title" :loading="loading">

    <template #append>
      <v-btn flat color="primary" prepend-icon="mdi-plus" @click="handleCreate()">
        Create New
      </v-btn>
    </template>

    <explorer-table
      ref="elExplorer"
      :resource="props.resource"
      :actions="tableActions"
      @update:loading="loading = $event"
    />

  </v-card>
</template>