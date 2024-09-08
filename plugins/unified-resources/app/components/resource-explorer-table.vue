<script setup>

/* interface */

const props = defineProps({
  resource: String,
  actions: Array,
  selectedResources: Array,
});

const emit = defineEmits([

]);


/* resource */

const { resourceUrlPart } = useResourceUrl({
  resource: () => props.resource,
});


/* meta */

const { meta } = useEnrichedMeta({
  resource: () => props.resource,
});


/* headers */

const headers = computed(() =>
  Object.entries(meta.value)
    .filter(it => !it[1].hideInTable)
    .map(it => ({
      ...it[1],
      key: it[0],
    }))
);


/* items */

const itemsInPage = ref(10);
const currentPage = ref(1);

const filters = ref({});
const sorts = ref({ 'createdAt': -1 });


const filtersQuery = computed(() =>
  Object.entries(filters.value)
    .filter(it => it[1])
    .map(it => `${it[0]}:${!isNaN(it[1]) ? 'is' : 'inc'}:${it[1]}`)
    .join(',')
);

const sortsQuery = computed(() =>
  Object.entries(sorts.value)
    .filter(it => it[1])
    .map(it => `${it[0]}:${it[1]}`)
    .join(',')
);

const { data: items, refresh: refreshItemsData } = useUFetch(
  computed(() => `${resourceUrlPart.value}/`),
  {
    query: {
      'filter': filtersQuery,
      'sort': sortsQuery,
      'skip': computed(() => (currentPage.value - 1) * itemsInPage.value),
      'limit': computed(() => itemsInPage.value),
    },
  }
);

const { data: itemsCount, refresh: refreshItemsCount } = useUFetch(
  computed(() => `${resourceUrlPart.value}/count`),
  {
    query: {
      'filters': filtersQuery,
    },
  }
);


const totalPages = computed(() =>
  Math.ceil(itemsCount.value / itemsInPage.value) || 1
);

watch(totalPages, () => {

  if (currentPage.value <= totalPages.value) {
    return;
  }

  currentPage.value = totalPages.value;

});


function refreshItems() {
  refreshItemsData();
  refreshItemsCount();
}


/* expose */

defineExpose({
  refreshItems,
  refreshItemsData,
  refreshItemsCount,
});


/* template */

import ExplorerTableCell from '../atoms/explorer-table-cell.vue';
import ExplorerTableFilterItem from '../atoms/explorer-table-filter-item.vue';

</script>


<template>
  <div>

    <u-table
      :headers="headers"
      :items="items"
      :selected-items="props.selectedResources"
      :actions="props.actions">

      <template #header-name="{ header, label }">

        <div class="flex items-center gap-2">

          {{ label }}

          <u-btn
            :icon="sorts[header.key] === undefined ? 'i-mdi-arrow-up-down' : (sorts[header.key] === -1 ? 'i-mdi-arrow-down' : 'i-mdi-arrow-up')"
            class="ghost text-xs p-[2px] -mt-1"
            @click="sorts = { [header.key]: sorts[header.key] === undefined ? -1 : (sorts[header.key] === -1 ? 1 : undefined) }"
          />

        </div>

        <explorer-table-filter-item
          class="font-normal"
          :header="header"
          v-model="filters[header.key]"
        />

      </template>

      <template #item="{ header, data }">
        <explorer-table-cell
          :header="header"
          :data="data"
        />
      </template>

    </u-table>

    <div class="py-3 flex items-center">

      <div class="flex gap-1">
        <u-btn
          v-for="index of totalPages"
          :label="String(index)"
          class="soft aspect-1 text-sm"
          :class="{
            'primary': currentPage === index,
          }"
          @click="currentPage = index"
        />
      </div>

      <div class="grow" />

      <div class="text-sm">
        Items to show
      </div>

      <u-select
        :items="[ 5, 10, 15, 30 ]"
        class="ms-3 w-[100px]"
        v-model="itemsInPage"
        @update:model-value="currentPage = 1;"
      />

    </div>

  </div>
</template>