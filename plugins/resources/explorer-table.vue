<script setup>

/* interface */

const props = defineProps({
  resource: String,
  loading: Boolean,
});

const emit = defineEmits([
  'update:loading',
]);


/* meta */

import { useMeta } from './composeables/use-meta';

const meta = useMeta({
  resource: props.resource,
});


/* headers */

const headers = computed(() =>
  meta.value.map(it => ({
    value: it.key,
    title: it.title,
  }))
);


/* items */

import { useNetwork } from './composeables/use-network';

const { loading, data: items } = useNetwork({
  method: 'get',
  url: `${props.resource.toLowerCase()}s/`,
});


watch(loading, () =>
  emit('update:loading', loading.value)
);


/* template */

import SimpleTable from './components/simple-table.vue';

</script>


<template>
  <simple-table
    :headers="headers"
    :items="items"
  />
</template>