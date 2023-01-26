<script setup>

/* interface */

const props = defineProps({
  resource: String,
  loading: Boolean,
  actions: Array,
  selectedResources: Array,
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

const totalPages = computed(() =>
  Math.ceil(itemsCount.value / itemsInPage.value) || 1
);

watch([totalPages], () => {

  if (currentPage.value <= totalPages.value) {
    return;
  }


  currentPage.value = totalPages.value;

});


function refreshItems() {
  refreshItemsData();
  refreshItemsCount();
}


watch([loading, countLoading], () =>
  emit('update:loading', loading.value || countLoading.value)
);


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
      :selected-items="props.selectedResources"
      :actions="props.actions">

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
        :length="totalPages"
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