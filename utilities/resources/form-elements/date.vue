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


/* date */

import dayjs from 'dayjs';


const fieldTitle = computed(() => {

  if (!props.value) {
    return
  };


  if (props.field.dateType === 'time') {
    return props.value;
  }


  if (props.field.valueFormat) {
    return dayjs(props.value, props.field.valueFormat).format(props.field.labelFormat || props.field.valueFormat)
  }

  if (props.field.labelFormat) {
    return dayjs(props.value).format(props.field.labelFormat);
  }


  return props.value;

});


const fieldValue = computed(() => {

  if (!props.value) {
    return
  };


  if (props.field.dateType === 'time') {
    return props.value;
  }


  if (props.field.valueFormat || props.field.labelFormat) {
    return dayjs(props.value, props.field.valueFormat).format('YYYY-MM-DD HH:mm');
  }


  return props.value;

});


function handleDateChange(newDate) {

  if (props.field.dateType === 'time') {

    emit(
      'input',
      newDate.slice(newDate.indexOf(' ') + 1)
    );

    return;

  }


  const epoch = dayjs(newDate, 'YYYY-MM-DD HH:mm').valueOf();

  if (props.field.valueFormat) {
    emit('input', dayjs(epoch).format(props.field.valueFormat));
    return;
  }

  emit('input', epoch);

}


/* template */

import DatePicker from 'vue3-persian-datetime-picker'

</script>


<template>
  <div class="form-element-date">

    <v-menu :close-on-content-click="false">

      <template #activator="{ props: ps }">
        <v-text-field
          :label="props.field.label"
          readonly
          :variant="props.field.variant"
          :density="props.field.density"
          :direction="props.field.direction"
          :prepend-icon="props.field.prependIcon"
          :append-icon="props.field.appendIcon"
          :prepend-inner-icon="props.field.prependInnerIcon"
          :append-inner-icon="props.field.appendInnerIcon"
          :color="props.field.color"
          :autofocus="props.field.autofocus"
          :placeholder="props.field.placeholder"
          :hint="props.field.hint"
          :model-value="fieldTitle"
          :success="props.success"
          :error="props.error || !!error"
          :messages="props.messages"
          v-bind="ps"
          hide-details="auto"
        />
      </template>

      <v-card>
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
      </v-card>

    </v-menu>

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