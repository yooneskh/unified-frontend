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

const emit = defineEmits([]);


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


/* template */

import startCase from 'lodash/startCase';

const isMobile = inject('isMobile');

</script>


<template>
  <v-table hover style="border-radius: 0;">

    <thead>
      <tr>

        <th v-for="header of headers" :key="header.key" style="white-space: nowrap;">
          {{ header.title || startCase(header.key) }}
        </th>

        <th v-if="props.actions">
          {{ props.actionsTitle }}
        </th>

      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(item, index) of items" :key="item[props.itemKey]"
        :style="{
          'background': (props.selectedItems?.includes(item[props.itemKey])) ? 'rgba( var(--v-theme-primary), 0.069)' : undefined,
        }">

        <td v-for="header of headers" :key="header.key">
          <slot name="item" :header="header" :item="item" :data="item[header.key]">
            {{ item[header.key] }}
          </slot>
        </td>

        <td v-if="props.actions" style="white-space: nowrap;">

          <template v-if="isMobile">
            <v-btn
              v-for="action of props.actions" :key="action.key"
              :color="action.color"
              variant="outlined"
              :prepend-icon="action.icon"
              size="small"
              flat
              class="me-2 my-1"
              :loading="actionsLoading[`${item[props.itemKey]}-${action.key}`]"
              @click="handleActionClick(action, item, index)">
              {{ action.title }}
            </v-btn>
          </template>

          <template v-else>
            <v-btn
              v-for="action of props.actions" :key="action.key"
              variant="tonal"
              size="small"
              density="comfortable"
              :color="action.color"
              :icon="action.icon"
              class="me-2 my-1"
              :loading="actionsLoading[`${item[props.itemKey]}-${action.key}`]"
              @click="handleActionClick(action, item, index)">

              <v-icon
                size="small"
                :icon="action.icon"
              />

              <v-tooltip
                activator="parent"
                :text="action.title"
              />

            </v-btn>
          </template>

        </td>

      </tr>
    </tbody>

  </v-table>
</template>