<script setup>

import pluralize from 'pluralize';
import startCase from 'lodash/startCase';


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
  resource: () => props.resource,
});


/* general */

const elExplorer = ref();


/* create */

async function handleCreate() {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
  });

  if (!result) {
    return;
  }


  refreshItems();

}


/* table actions */

const tableActions = computed(() => {

  const result = [];

  result.push({
    key: 'update',
    icon: 'i-mdi-pencil',
    label: 'Update',
    handler: handleItemUpdate,
  });

  result.push({
    key: 'delete',
    icon: 'i-mdi-delete',
    label: 'Delete',
    classes: 'danger',
    handler: handleItemDelete,
  });

  if (props.extraObjectActions) {
    result.push(...props.extraObjectActions);
  }

  return result;

});


async function handleItemDelete(item) {
  await launchButtonPickerDialog({
    icon: 'i-mdi-delete',
    title: `Delete ${props.resource}`,
    text: 'Are you sure you want to delete this?',
    options: {
      containerClasses: 'w-md',
    },
    startButtons: [
      {
        label: 'No, Cancel',
      },
    ],
    endButtons: [
      {
        label: 'Yes, Delete this',
        classes: 'danger',
        async handler() {

          await ufetch(`/${resourceUrlPart.value}/${item._id}`, {
            method: 'delete',
          });

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

</script>


<template>
  <section>

    <div class="flex items-center">

      <u-icon
        v-if="props.icon"
        :name="props.icon"
        class="me-2 text-xl"
      />

      <div class="text-xl font-bold">
        {{ props.title ?? `Manage ${startCase(pluralize(props.resource))}` }}
      </div>

      <div class="grow" />

      <u-btn
        icon="i-mdi-plus"
        label="Create New"
        class="primary text-sm"
        :click-handler="handleCreate"
      />

    </div>

    <resource-explorer-table
      ref="elExplorer"
      :resource="props.resource"
      :actions="tableActions"
      class="mt-2"
    />

  </section>
</template>