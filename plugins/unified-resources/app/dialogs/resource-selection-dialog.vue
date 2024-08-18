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


/* template */

</script>


<template>
  <div class="bg-surface p-5 rounded-md w-[768px]">

    <h2 class="text-xl flex items-center gap-2">

      <u-icon name="i-mdi-file-document" />

      <span>
        Select {{ props.resource }}
      </span>

      <div class="grow" />

      <u-btn
        variant="soft"
        color="primary"
        icon="i-mdi-plus"
        class="text-sm"
        @click="selectNewResource()">
        Select New
      </u-btn>

      <u-btn
        v-if="props.multiple"
        color="primary"
        icon="i-mdi-check"
        class="text-sm"
        @click="emit('resolve', [...selectedResources])">
        Confirm Selection
      </u-btn>
      
    </h2>

    <div v-if="props.multiple && selectedResources.length > 0" class="mt-4">
      <u-chip
        v-for="(resourceId, index) of selectedResources" :key="resourceId"
        variant="soft"
        color="primary"
        class="me-2">
  
        {{ titles[resourceId] ?? '---' }}

        <u-icon
          name="i-mdi-close"
          @click="selectedResources.splice(index, 1)"
        />
  
      </u-chip>
    </div>

    <resource-explorer-table
      :resource="props.resource"
      :selected-resources="selectedResources"
      class="mt-4"
      :actions="[
        {
          value: 'select',
          icon: 'i-mdi-checkbox-marked',
          title: 'Select',
          color: 'primary',
          handler: handleItemSelection,
        },
      ]"
    />

  </div>
</template>