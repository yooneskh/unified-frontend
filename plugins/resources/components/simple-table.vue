<script setup>

/* interface */

const props = defineProps({
  headers: Array,
  items: Array,
  itemKey: {
    type: String,
    default: '_id',
  }
});

const emit = defineEmits([]);


/* template */

import felan from 'lodash/startCase';

</script>


<template>
  <v-table>

    <thead>
      <tr>
        <th v-for="header of headers" :key="header.key">
          {{ header.title || felan(header.key) }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item of items" :key="item[props.itemKey]">
        <td v-for="header of headers" :key="header.key">
          <slot name="item" :header="header" :item="item" :data="item[header.key]">
            {{ item[header.key] }}
          </slot>
        </td>
      </tr>
    </tbody>

  </v-table>
</template>