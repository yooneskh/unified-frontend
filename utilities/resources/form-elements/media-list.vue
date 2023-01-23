<script setup>

/* interface */

const props = defineProps({
  field: Object,
  value: {},
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const emit = defineEmits([
  'input',
]);


/* form value */

const valueProxy = reactive({
  files: [],
});

watch([props], () => {
  if (props.value && Array.isArray(props.value) && JSON.stringify(props.value) !== JSON.stringify(valueProxy.files.map(it => it.file))) {
    valueProxy.files = props.value.map(it => ({ file: it }));
  }
}, { immediate: true });


/* emit */

watch(valueProxy, () => {
  emit('input', valueProxy.files.map(it => it.file))
});


/* template */

const fields = computed(() => [
  {
    key: 'files', identifier: 'series', label: props.field.label,
    itemWidth: props.field.itemWidth,
    itemFields: [
      {
        key: 'file', identifier: 'media', label: 'File',
      },
    ],
  }
]);


/* template */

</script>


<template>
  <u-form
    :target="valueProxy"
    :fields="fields"
  />
</template>