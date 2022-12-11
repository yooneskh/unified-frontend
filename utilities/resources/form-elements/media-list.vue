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


const valueProxy = reactive({
  files: [],
});

onMounted(() => {
  valueProxy.files = (props.value ?? []).map(it => ({ file: it }));
});

/* template */

</script>


<template>
  <u-form
    class="pa-0"
    :target="valueProxy"
    :fields="[
      {
        key: 'files', identifier: 'series', label: props.field.label,
        itemWidth: props.field.itemWidth,
        itemsFields: [
          {
            key: 'file', identifier: 'media', label: 'File',
          },
        ],
      },
    ]"
  />
</template>