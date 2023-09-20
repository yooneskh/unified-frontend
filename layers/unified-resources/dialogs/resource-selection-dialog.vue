<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


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
  resource: computed(() => props.resource),
  resourceIds: selectedResources,
});


/* template */

</script>


<template>
  <a-card prepend-icon="mdi-file-document" class="w-768px">

    <template #title>
      <div class="flex items-start gap-2">

        <span>
          Select {{ props.resource }}
        </span>
  
        <div class="grow" />
  
        <a-btn
          variant="light"
          color="primary"
          icon="i-bx-plus"
          class="text-sm"
          @click="selectNewResource()">
          Select New
        </a-btn>

        <a-btn
          v-if="props.multiple"
          color="primary"
          icon="i-bx-check"
          class="text-sm"
          @click="emit('resolve', [...selectedResources])">
          Confirm Selection
        </a-btn>

      </div>
    </template>

    <div class="a-card-body" v-if="props.multiple && selectedResources.length > 0">
      <a-chip
        v-for="(resourceId, index) of selectedResources" :key="resourceId"
        variant="light"
        color="primary"
        class="me-2"
        closable
        @click:close="selectedResources.splice(index, 1)">

        {{ titles[resourceId] ?? '---' }}

      </a-chip>
    </div>

    <resource-explorer-table
      :resource="props.resource"
      :selected-resources="selectedResources"
      :actions="[
        {
          value: 'select',
          icon: 'i-bx-check-square',
          title: 'Select',
          color: 'primary',
          handler: handleItemSelection
        }
      ]"
    />

  </a-card>
</template>