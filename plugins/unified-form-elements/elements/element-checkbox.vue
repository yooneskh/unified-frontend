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
  <u-checkbox
    :label="props.field.label"
    :icon="props.field.icon"
    :color="props.field.color"
    :disabled="props.field.disabled"
    :unchecked-value="props.field.uncheckedValue"
    :checked-value="props.field.checkedValue"
    :message="props.field.message"
    class="mt-8"
    v-model="proxy"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined"
  />
</template>