<script setup>

const http = useHttp();


/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
  extraObjectActions: Array,
});

const emit = defineEmits([

]);


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
    icon: 'i-bx-pencil',
    title: 'Update',
    handler: handleItemUpdate,
  },
  {
    key: 'delete',
    color: 'danger',
    icon: 'i-bx-bxs-trash',
    title: 'Delete',
    handler: handleItemDelete,
  },
  ...(props.extraObjectActions ?? []),
];


async function handleItemDelete(item) {
  await launchButtonPickerDialog({
    icon: 'mdi-delete',
    title: `Delete ${props.resource}`,
    text: 'Are you sure you want to delete this?',
    startButtons: [
      {
        title: 'No, Cancel',
      },
    ],
    endButtons: [
      {
        title: 'Yes, Delete this',
        color: 'danger',
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
  <section>

    <div class="flex justify-between items-start">

      <div class="text-xl font-bold">
        {{ props.title ?? `Manage ${startCase(pluralize(props.resource))}` }}
      </div>

      <a-btn
        color="primary"
        icon="i-bx-plus"
        class="text-sm"
        @click="handleCreate()">
        Create New
      </a-btn>

    </div>

    <resource-explorer-table
      ref="elExplorer"
      :resource="props.resource"
      :actions="tableActions"
      class="mt-4"
      @update:loading="loading = $event"
    />

  </section>
</template>