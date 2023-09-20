<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  initialForm: Object,
  fields: Array,
  submitLabel: String,
  cancelLabel: String,
  submitHandler: Function,
});

const emit = defineEmits([
  'resolve',
]);


/* form */

const form = reactive(JSON.parse(JSON.stringify( props.initialForm ?? {} )));

const isValid = ref(true);


/* submission */

const submitting = ref(false);

async function handleSubmit() {

  if (props.submitHandler) {
    try {
      submitting.value = true;
      await props.submitHandler({ ...form });
      submitting.value = false;
    }
    catch (error) {
      submitting.value = false;
      console.error(error);
      return;
    }
  }


  emit('resolve', { ...form });

}

</script>


<template>
  <a-card
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle">

    <div class="a-card-body">

      <p v-if="props.text" class="mb-4">
        {{ props.text }}
      </p>

      <pre class="bg-blue">{{ props.fields }}</pre>

    </div>

    <div class="flex item-end pa-2">

      <a-btn
        variant="light"
        color="primary"
        :disabled="!isValid"
        :loading="submitting"
        @click="handleSubmit()">
        {{ props.submitHandler || 'ثبت' }}
      </a-btn>

      <div class="grow" />

      <a-btn @click="emit('resolve')">
        {{ props.cancelLabel || 'لغو' }}
      </a-btn>

    </div>

  </a-card>
</template>