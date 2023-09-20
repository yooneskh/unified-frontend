<script setup>


/* interface */

const props = defineProps({
  resource: String,
  actions: Array,
  selectedResources: Array,
});

const emit = defineEmits([

]);

const loading = defineModel('loading', {
  type: Boolean,
  local: true,
});


/* shared */

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});


/* meta */

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


const { loading: itemsLoading, data: items, refresh: refreshItemsData } = useNetwork({
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


watch([itemsLoading, countLoading], () => {
  loading.value = itemsLoading.value || countLoading.value;
});


/* expose */

defineExpose({
  refreshItems,
  refreshItemsData,
  refreshItemsCount,
});


/* template */

import ExplorerTableCell from '../atoms/explorer-table-cell.vue';

</script>


<template>
  <div class="explorer-table">

    <u-table
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

    </u-table>

    <div class="pa-3 flex items-center">

      <div class="flex gap-1">
        <a-btn
          v-for="index of totalPages"
          variant="light"
          :color="currentPage === index ? 'primary' : ''"
          class="rounded-full text-sm"
          @click="currentPage = index">
          {{ index }}
        </a-btn>
      </div>

      <div class="grow" />

      <div class="text-sm">
        Items to show
      </div>

      <a-select
        variant="outline"
        class="grow-0 text-sm ms-3 w-100px"
        :options="[5, 10, 15, 30]"
        v-model="itemsInPage"
        @update:model-value="currentPage = 1"
      />

    </div>

  </div>
</template>