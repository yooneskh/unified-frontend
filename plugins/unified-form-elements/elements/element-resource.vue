<script setup>

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
  resource: () => props.field.resource,
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
  <u-input
    :label="props.field.label"
    :placeholder="props.field.placeholder"
    :icon="props.field.icon"
    :inner-icon="props.field.innerIcon"
    :append-icon="props.field.appendIcon"
    :inner-append-icon="props.field.innerAppendIcon"
    :input-classes="props.field.inputClasses"
    :message="props.field.message"
    :loading="props.field.loading || loading"
    :readonly="props.field.readonly"
    :disabled="props.field.disabled"
    @click.self="selectResource()"
    :model-value="title"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined">

    <template #append-inner>
      <slot name="append-inner" />
    </template>

  </u-input>
</template>