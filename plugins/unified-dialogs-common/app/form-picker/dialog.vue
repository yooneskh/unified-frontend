<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  classes: String,
  fields: Array,
  submitLabel: Array,
  cancelLabel: Array,
  handler: Function,
});

const emit = defineEmits([
  'resolve',
]);


/* form */

const form = reactive({});

async function handleSubmit() {

  if (!props.handler) {
    emit('resolve', form);
    return
  }


  try {
    await props.handler?.(form);
    emit('resolve', form);
  }
  catch {

  }

}

</script>


<template>
  <u-card
    :icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle"
    :text="props.text"
    :class="props.classes">

    <u-form
      :target="form"
      :fields="props.fields"
      class="mt-3"
    />

    <div class="flex gap-2 mt-4">

      <u-btn
        :label="props.submitLabel || 'Submit'"
        class="primary"
        :click-handler="handleSubmit"
      />
      
      <div class="grow" />

      <u-btn
        :label="props.cancelLabel || 'Cancel'"
        @click="emit('resolve')"
      />

    </div>

  </u-card>
</template>