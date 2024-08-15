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
  <u-textarea
    :label="props.field.label"
    :placeholder="props.field.placeholder"
    :type="props.field.type"
    :rows="props.field.rows"
    :icon="props.field.icon"
    :inner-icon="props.field.innerIcon"
    :append-icon="props.field.appendIcon"
    :inner-append-icon="props.field.innerAppendIcon"
    :input-classes="props.field.inputClasses"
    :message="props.field.message"
    :loading="props.field.loading"
    :readonly="props.field.readonly"
    :disabled="props.field.disabled"
    v-model="modelValue"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined"
  />
</template>