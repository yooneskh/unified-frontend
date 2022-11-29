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

</script>


<template>
  <v-table>

    <thead>
      <tr>
        <th v-for="header of headers" :key="header.value">
          {{ header.title }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item of items" :key="item[props.itemKey]">
        <td v-for="header of headers" :key="header.value">
          {{ item[header.value] }}
        </td>
      </tr>
    </tbody>

  </v-table>
</template>