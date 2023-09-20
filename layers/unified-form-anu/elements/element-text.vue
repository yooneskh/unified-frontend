<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* template */

</script>


<template>
  <a-input
    :label="props.field.label"
    :placeholder="props.field.placeholder"
    :type="props.field.type"
    :append-icon="props.field.appendIcon"
    :prepend-icon="props.field.prependIcon"
    :prepend-inner-icon="props.field.prependInnerIcon"
    :append-inner-icon="props.field.appendInnerIcon"
    :input-wrapper-classes="props.field.inputWrapperClasses"
    :input-classes="props.field.inputClasses"
    :input-wrapper-attrs="props.field.inputWrapperAttrs"
    :hint="props.field.hint"
    :loading="props.field.loading"
    :readonly="props.field.readonly"
    :disabled="props.field.disabled"
    v-model="modelValue"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined"
  />
</template>