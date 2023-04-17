<script setup>

const { http, generalHttpHandle } = useHttp();

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


/* titles */

import { useResourceArrayTitles } from './composeables/use-resource-title';

const { titles } = useResourceArrayTitles({
  resource: computed(() => props.resource),
  resourceIds: selectedResources,
});


/* template */

import ResourceExplorerTable from './explorer-table.vue';

</script>


<template>
  <v-card
    flat
    prepend-icon="mdi-file-document"
    :title="`Select ${props.resource}`"
    width="1024">

    <template v-if="props.multiple" #append>
      <v-btn flat color="primary" prepend-icon="mdi-check" @click="emit('resolve', [...selectedResources])">
        Confirm Selection
      </v-btn>
    </template>

    <v-card-text v-if="props.multiple && selectedResources.length > 0">
      <v-chip
        v-for="(resourceId, index) of selectedResources" :key="resourceId"
        variant="tonal"
        color="primary"
        class="me-2"
        closable
        @click:close="selectedResources.splice(index, 1)">

        {{ titles[resourceId] ?? '---' }}

      </v-chip>
    </v-card-text>

    <resource-explorer-table
      :resource="props.resource"
      :selected-resources="selectedResources"
      :actions="[
        {
          value: 'select',
          icon: 'mdi-open-in-new',
          title: 'Select',
          color: 'primary',
          handler: handleItemSelection
        }
      ]"
    />

  </v-card>
</template>