<script setup>

/* interface */

const props = defineProps({
  header: Object,
  data: {},
});

const emit = defineEmits([]);


/* template */

</script>


<template>
  <template v-if="props.header.type === 'number'">
    {{ (typeof props.data === 'number') ? (props.data.toLocaleString()) : (props.data) }}
  </template>
  <template v-else>
    {{ props.data }}
  </template>
</template>