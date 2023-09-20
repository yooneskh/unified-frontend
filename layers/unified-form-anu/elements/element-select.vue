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
  <a-select
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
    :loading="props.field.loading"
    :readonly="props.field.readonly"
    :disabled="props.field.disabled"
    :options="props.field.items || props.field.enum"
    :options-wrapper-classes="props.field.optionsWrapperClasses"
    :list-classes="props.field.listClasses"
    :emit-object="props.field.emitObject"
    v-model="modelValue"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined"
  />
</template>