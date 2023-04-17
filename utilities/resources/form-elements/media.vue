<script setup>

const { http, generalHttpHandle } = useHttp();


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


/* file */

const elFile = ref();


/* upload */

const loading = ref(false);
const uploading = ref(false);
const media = ref(undefined);
const error = ref(undefined);


const title = computed(() => {

  if (uploading.value) {
    return 'Uploading ...';
  }

  if (loading.value) {
    return 'Loading ...';
  }

  if (error.value) {
    return error.value;
  }

  if (media.value) {
    return `${media.value.name}.${media.value.extension}`;
  }

  return '';

});


async function handleFileChange(event) {

  const file = event?.target.files[0];

  if (!file) {
    return;
  }

  const payload = new FormData();
  payload.append('file', file);


  uploading.value = true;
  error.value = undefined;

  const { status, data } = await http.request({
    method: 'post',
    url: '/media/upload',
    body: payload,
  });

  uploading.value = false;

  if (generalHttpHandle(status, data, true)) {
    error.value = data?.message || 'Could not upload file.';
    return;
  }


  media.value = data;
  emit('input', data._id);

}


watchEffect(async () => {

  if (!props.value || props.value === media.value?._id) {
    return;
  }


  loading.value = true;
  error.value = undefined;

  const { status, data } = await http.request({
    method: 'get',
    url: `/media/${props.value}`,
  });

  loading.value = false;

  if (generalHttpHandle(status, data, true)) {
    error.value = data?.message || 'Could not retrieve file.';
    return;
  }


  media.value = data;

});


function openMedia() {
  window.open(media.value.path, '_blank');
}


/* template */

</script>


<template>

  <input
    ref="elFile"
    type="file"
    class="d-none"
    :key="loading"
    @change="handleFileChange($event)"
  />

  <v-text-field
    v-bind="$attrs"
    :label="props.field.label"
    readonly
    :variant="props.field.variant"
    :density="props.field.density"
    :direction="props.field.direction"
    :prepend-icon="props.field.prependIcon"
    :append-icon="props.field.appendIcon"
    :prepend-inner-icon="props.field.prependInnerIcon || 'mdi-paperclip'"
    :append-inner-icon="props.field.appendInnerIcon"
    :color="props.field.color"
    :autofocus="props.field.autofocus"
    :placeholder="props.field.placeholder"
    :hint="props.field.hint"
    @click="elFile.click()"
    :loading="loading || uploading"
    :model-value="title"
    :success="props.success"
    :error="props.error || !!error"
    :messages="props.messages"
    hide-details="auto">

    <template v-if="media" #append-inner>
      <v-btn
        icon="mdi-open-in-new"
        variant="text"
        density="comfortable"
        class="mt-n1"
        @click="openMedia()"
      />
    </template>

  </v-text-field>

</template>