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
});

const emit = defineEmits([]);


/* template */

import startCase from 'lodash/startCase';

const isMobile = inject('isMobile');

</script>


<template>
  <v-table hover style="border-radius: 0;">

    <thead class="bg-grey-lighten-3">
      <tr>

        <th v-for="header of headers" :key="header.key">
          {{ header.title || startCase(header.key) }}
        </th>

        <th v-if="props.actions">
          {{ props.actionsTitle }}
        </th>

      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) of items" :key="item[props.itemKey]">

        <td v-for="header of headers" :key="header.key">
          <slot name="item" :header="header" :item="item" :data="item[header.key]">
            {{ item[header.key] }}
          </slot>
        </td>

        <td v-if="props.actions">

          <template v-if="isMobile">
            <v-btn
              v-for="action of props.actions" :key="action.key"
              :color="action.color"
              variant="outlined"
              :prepend-icon="action.icon"
              size="small"
              flat
              class="me-2 my-1"
              @click="action.handler?.(item, index)">
              {{ action.title }}
            </v-btn>
          </template>

          <template v-else>
            <v-btn
              v-for="action of props.actions" :key="action.key"
              variant="outlined"
              size="small"
              density="comfortable"
              :color="action.color"
              :icon="action.icon"
              flat
              class="me-2 my-1"
              @click="action.handler?.(item, index)">

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