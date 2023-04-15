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
  <v-card
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle">

    <v-card-text v-if="props.text">
      {{ props.text }}
    </v-card-text>

    <v-card-text>
      <u-form
        :target="form"
        :fields="props.fields"
        v-model:is-valid="isValid"
      />
    </v-card-text>

    <v-card-actions>

      <v-btn color="primary" :disabled="!isValid" :loading="submitting" @click="handleSubmit()">
        {{ props.submitLabel || 'Submit' }}
      </v-btn>

      <v-spacer />

      <v-btn @click="emit('resolve')">
        {{ props.cancelLabel || 'Cancel' }}
      </v-btn>

    </v-card-actions>

  </v-card>
</template>