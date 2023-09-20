<script setup>


/* interface */

const props = defineProps({
  headers: Array,
  items: Array,
  itemKey: {
    type: String,
    default: '_id',
  },
  actions: Array,
  actionsTitle: {
    type: String,
    default: 'Actions',
  },
  selectedItems: Array,
});

const emit = defineEmits([

]);


/* actions */

const actionsLoading = reactive({});

async function handleActionClick(action, item, index) {

  actionsLoading[`${item[props.itemKey]}-${action.key}`] = true;

  try {
    await action.handler?.(item, index);
  }
  catch {}

  actionsLoading[`${item[props.itemKey]}-${action.key}`] = false;

}


/* headers */

import startCase from 'lodash/startCase';

const columns = computed(() => {

  const columns = props.headers.map(it => ({
    name: it.key,
    text: it.title || startCase(it.key),
  }));

  if (props.actions) {
    columns.push({
      name: '_actions',
      text: props.actionsTitle,
    });
  }

  return columns;

});


/* template */

</script>


<template>
  <a-table
    class="bg-transparent shadow-none"
    :cols="columns"
    :rows="items">

    <template #header-_actions>
      <div class="text-center">
        {{ props.actionsTitle }}
      </div>
    </template>

    <template
      v-for="header of headers" :key="header.key"
      #[`col-${header.key}`]="{ row }">

      <slot name="item" :header="header" :item="row" :data="row[header.key]">
        {{ row[header.key] }}
      </slot>

    </template>

    <template v-if="props.actions" #col-_actions="{ row }">
      <div class="flex items-center justify-center gap-1">
        <a-btn
          v-for="(action, index) of props.actions" :key="action.key"
          variant="light"
          :color="action.color"
          :icon="action.icon"
          :icon-only="!isMobile"
          class="text-xs"
          :loading="actionsLoading[`${row[props.itemKey]}-${action.key}`]"
          @click="handleActionClick(action, row, index)">
  
          <template v-if="isMobile">
            {{ action.title }}
          </template>
  
          <a-tooltip
            v-if="!isMobile"
            :text="action.title"
          />
  
        </a-btn>
      </div>
    </template>

  </a-table>
</template>