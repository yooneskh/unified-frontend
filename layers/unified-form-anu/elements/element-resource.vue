<script setup>
import { watchImmediate } from '@vueuse/core';


const http = useHttp();


/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* resource */

const loading = ref(false);

const { title } = useResourceArrayTitles({
  resource: computed(() => props.field.resource),
  resourceIds: computed(() => props.field.multiple ? modelValue.value : modelValue.value ? [modelValue.value] : []),
});


async function selectResource() {

  const selecteds = await launchResourceSelectionDialog({
    resource: props.field.resource,
    multiple: props.field.multiple,
    resourceIds: !modelValue.value ? [] : Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value],
  });

  if (!selecteds) {
    return;
  }


  if (props.field.multiple) {
    modelValue.value = selecteds;
  }
  else {
    modelValue.value = selecteds[0];
  }

}


/* template */

</script>


<template>
  <a-input
    :label="props.field.label"
    :placeholder="props.field.placeholder"
    :append-icon="props.field.appendIcon"
    :prepend-icon="props.field.prependIcon"
    :prepend-inner-icon="props.field.prependInnerIcon"
    :append-inner-icon="props.field.appendInnerIcon"
    :input-wrapper-classes="props.field.inputWrapperClasses"
    :input-classes="props.field.inputClasses"
    :input-wrapper-attrs="props.field.inputWrapperAttrs"
    :hint="props.field.hint"
    :loading="props.field.loading || loading"
    :readonly="props.field.readonly"
    :disabled="props.field.disabled"
    @click="selectResource()"
    :model-value="title"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined"
  />
</template>