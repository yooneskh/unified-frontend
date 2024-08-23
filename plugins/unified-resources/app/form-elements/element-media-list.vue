<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* form value */

const valueProxy = reactive({
  files: [],
});

watch([props], () => {
  if (modelValue.value && Array.isArray(modelValue.value) && JSON.stringify(modelValue.value) !== JSON.stringify(valueProxy.files.map(it => it.file))) {
    valueProxy.files = modelValue.value.map(it => ({ file: it }));
  }
}, { immediate: true });

watch(valueProxy, () => {
  modelValue.value = valueProxy.files.map(it => it.file);
});


/* template */

const fields = computed(() => [
  {
    key: 'files', identifier: 'series', label: props.field.label,
    seriesColumns: props.field.seriesColumns,
    itemFields: [
      {
        key: 'file', identifier: 'media', label: props.field.fileLabel || 'File',
      },
    ],
  }
]);

</script>


<template>
  <u-form
    :target="valueProxy"
    :fields="fields"
  />
</template>