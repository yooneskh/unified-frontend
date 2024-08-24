<script setup>

/* interface */

const props = defineProps({
  resource: String,
  multiple: Boolean,
  resourceIds: Array,
});

const emit = defineEmits([
  'resolve',
]);


/* selection */

const selectedResources = reactive([
  ...(props.resourceIds ?? []),
]);


function handleItemSelection(item) {

  if (!props.multiple) {
    emit('resolve', [item._id]);
    return;
  }


  if (selectedResources.includes(item._id)) {
    return;
  }

  selectedResources.push(item._id);

}


/* select new */

async function selectNewResource() {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
  });

  if (!result) {
    return;
  }


  handleItemSelection(result);

}


/* titles */

const { titles } = useResourceArrayTitlesMap({
  resource: () => props.resource,
  resourceIds: selectedResources,
});

</script>


<template>
  <u-card
    icon="i-mdi-file-document"
    :title="`Select ${props.resource}`"
    class="w-5xl max-w-full">

    <template #append>
      <u-btn
        icon="i-mdi-plus"
        label="Select New"
        class="soft primary text-sm"
        :click-handler="selectNewResource"
      />
      <u-btn
        v-if="props.multiple"
        icon="i-mdi-check"
        label="Confirm Selection"
        class="primary text-sm ms-2"
        @click="emit('resolve', [...selectedResources])"
      />
    </template>

    <div v-if="props.multiple && selectedResources.length > 0" class="mt-4 flex flex-wrap gap-2">
      <u-chip
        v-for="(resourceId, index) of selectedResources" :key="resourceId"
        class="soft primary"
        :label="titles[resourceId] ?? '---'"
        append-action-icon="i-mdi-close"
        @click:append-action="selectedResources.splice(index, 1)"
      />
    </div>

    <resource-explorer-table
      :resource="props.resource"
      :selected-resources="selectedResources"
      class="mt-4"
      :actions="[
        {
          value: 'select',
          icon: 'i-mdi-checkbox-marked',
          label: 'Select',
          classes: 'primary',
          handler: handleItemSelection,
        },
      ]"
    />

  </u-card>
</template>