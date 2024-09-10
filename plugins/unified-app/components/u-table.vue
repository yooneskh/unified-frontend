<script setup>

import startCase from 'lodash/startCase';


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

</script>


<template>
  <div class="w-full overflow-x-auto border">
    <table class="w-full">
  
      <thead class="border-b">
        <tr>
  
          <th v-for="header of props.headers" :key="header.key">
            <slot name="header" :header="header">
              <div class="text-start px-3 py-2 whitespace-nowrap">
                <slot name="header-name" :header="header" :label="startCase(header.key)">
                  <span :class="header.headerClasses">
                    {{ header.label || startCase(header.key) }}
                  </span>
                </slot>
              </div>
            </slot>
          </th>
  
          <th v-if="props.actions?.length > 0" class="text-center px-3 py-2">
            {{ props.actionsTitle }}
          </th>
  
        </tr>
      </thead>
  
      <tbody>
        <tr v-if="!( props.items?.length > 0 )">
          <td colspan="999" class="text-center p-6">
            No items to show.
          </td>
        </tr>
        <tr
          v-for="row of props.items" :key="row[props.itemKey]"
          class="transition hover:bg-black/10"
          :class="{
            'bg-primary/15': props.selectedItems?.includes(row[props.itemKey]),
          }">
  
          <td
            v-for="header of props.headers" :key="header.key"
            class="text-start px-3 py-4">
  
            <slot name="item" :header="header" :item="row" :data="row[header.key]">
              <span :class="header.bodyClasses">
                {{ row[header.key] }}
              </span>
            </slot>
  
          </td>
  
          <td v-if="props.actions?.length > 0">
            <div class="flex items-center justify-center gap-1 px-2">
              <div v-for="(action, index) of props.actions" :key="action.key">
              
                <u-btn
                  :icon="action.icon"
                  class="ghost hidden md:inline-flex whitespace-nowrap"
                  :class="action.classes"
                  :loading="actionsLoading[`${row[props.itemKey]}-${action.key}`]"
                  @click="handleActionClick(action, row, index)"
                />
                <u-btn
                  :label="action.label"
                  :icon="action.icon"
                  class="ghost md:hidden whitespace-nowrap"
                  :class="action.classes"
                  :loading="actionsLoading[`${row[props.itemKey]}-${action.key}`]"
                  @click="handleActionClick(action, row, index)"
                />
    
                <u-tooltip
                  :text="action.label"
                  class="md:block"
                />
  
              </div>
            </div>
          </td>
  
        </tr>
      </tbody>
  
    </table>
  </div>
</template>