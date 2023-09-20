<script setup>


/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* date */

const fieldTitle = computed(() => {

  if (!modelValue.value) {
    return
  };


  if (props.field.dateType === 'time') {
    return modelValue.value;
  }


  if (props.field.valueFormat) {
    return formatDate(modelValue.value, props.field.labelFormat ?? props.field.valueFormat, undefined, undefined, props.field.valueFormat);
  }

  if (props.field.labelFormat) {
    return formatDate(modelValue.value, props.field.labelFormat);
  }


  return modelValue.value;

});


const fieldValue = computed(() => {

  if (!modelValue.value) {
    return
  };


  if (props.field.dateType === 'time') {
    return modelValue.value;
  }


  if (props.field.valueFormat || props.field.labelFormat) {
    return formatDate(modelValue.value, 'YYYY-MM-DD HH:mm', undefined, undefined, props.field.valueFormat);
  }


  return modelValue.value;

});


function handleDateChange(newDate) {

  if (props.field.dateType === 'time') {
    modelValue.value = newDate.slice(newDate.indexOf(' ') + 1);
    return;
  }


  const epoch = dateToTimestamp(newDate, 'YYYY-MM-DD HH:mm');

  if (props.field.valueFormat) {
    modelValue.value = formatDate(epoch, props.field.valueFormat);
    return;
  }

  modelValue.value = epoch;

}


/* template */

import DatePicker from 'vue3-persian-datetime-picker';

</script>


<template>
  <div>

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
      :loading="props.field.loading"
      :readonly="props.field.readonly"
      :disabled="props.field.disabled"
      :model-value="fieldTitle"
      :error="props.error ? props.messages?.join(' - ') : undefined"
      :success="props.success ? props.messages?.join(' - ') : undefined"
    />

    <a-menu persist="content">
      <date-picker
        class="vpd-datepicker-form-element"
        locale="en"
        format="YYYY-MM-DD HH:mm"
        :type="props.field.dateType"
        simple
        auto-submit
        inline
        :model-value="fieldValue"
        @update:model-value="handleDateChange($event)"
      />
    </a-menu>

  </div>
</template>


<style scoped>

  .vpd-datepicker-form-element :deep(.vpd-content) {
    width: unset;
  }

  .vpd-datepicker-form-element :deep(.vpd-input-group) {
    display: none;
  }

</style>