<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* model */

const proxy = computed({
  get: () => {

    if (!modelValue.value) {
      return false;
    }

    return true;

  },
  set: v => {
    modelValue.value = v;
  },
});


/* template */

</script>


<template>
  <a-checkbox
    :label="props.field.label"
    :icon="props.field.icon"
    :color="props.field.color"
    :disabled="props.field.disabled"
    :cycle-indeterminate="props.field.cycleIndeterminate"
    :unchecked-value="props.field.uncheckedValue"
    :indeterminate-value="props.field.indeterminateValue"
    :checked-value="props.field.checkedValue"
    :input-classes="props.field.inputClasses"
    v-model="proxy"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined"
  />
</template>