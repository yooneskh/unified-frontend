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

const isOpened = ref(false);

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

    <u-input
      :label="props.field.label"
      :placeholder="props.field.placeholder"
      :icon="props.field.icon"
      :inner-icon="props.field.innerIcon"
      :append-icon="props.field.appendIcon"
      :inner-append-icon="props.field.innerAppendIcon"
      :label-classes="props.field.labelClasses"
      :container-classes="props.field.containerClasses"
      :input-classes="props.field.inputClasses"
      :message="props.field.message"
      :loading="props.field.loading"
      :readonly="props.field.readonly"
      :disabled="props.field.disabled"
      :model-value="fieldTitle"
      :error="props.error ? props.messages?.join(' - ') : undefined"
      :success="props.success ? props.messages?.join(' - ') : undefined"
    />

    <u-dropdown persist="content" class="w-[512px]" v-model="isOpened">
      <!-- <date-picker
        class="vpd-datepicker-form-element block w-[300px] border shadow-md rounded-lg"
        locale="en"
        format="YYYY-MM-DD HH:mm"
        :type="props.field.dateType"
        simple
        auto-submit
        inline
        :model-value="fieldValue"
        @update:model-value="handleDateChange($event)"
      /> -->
      <div class="shadow-lg border rounded-lg overflow-hidden">
        <date-picker
          format="jYYYY/jMM/jDD"
          inline
          class="[&>.vpd-input-group]:hidden vpd-datepicker-form-element"
          v-model="modelValue"
          @update:model-value="isOpened = false;"
        />
      </div>
    </u-dropdown>

  </div>
</template>


<style scoped>

  .vpd-datepicker-form-element :deep(.vpd-next), .vpd-datepicker-form-element :deep(.vpd-prev) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>