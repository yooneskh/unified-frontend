<script setup>

const http = useHttp();


/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* file */

const elFile = ref();
const tickle = ref(0);

const loading = ref(false);
const mediaObject = ref(undefined);

const fieldText = computed(() =>
  !mediaObject.value ? '' : `${mediaObject.value.name}.${mediaObject.value.extension}`
);


async function handleFileSelected(file) {

  tickle.value++;


  const payload = new FormData();
  payload.append('file', file);


  loading.value = true;
  const { status, data } = await http.request({
    method: 'post',
    url: `/media/upload`,
    body: payload,
  });
  loading.value = false;
  
  if (generalHttpHandle(status, data)) {
    return;
  }


  modelValue.value = data._id;

}


watch(modelValue, async () => {

  mediaObject.value = undefined;

  if (!modelValue.value) {
    return;
  }


  loading.value = true;
  const { status, data } = await http.request({
    method: 'get',
    url: `/media/${modelValue.value}`,
  });
  loading.value = false;
  
  if (generalHttpHandle(status, data)) {
    return;
  }


  mediaObject.value = data;

});


/* template */

</script>


<template>

  <a-input
    :label="props.field.label"
    :placeholder="props.field.placeholder"
    :append-icon="props.field.appendIcon"
    :prepend-icon="props.field.prependIcon"
    :prepend-inner-icon="props.field.prependInnerIcon  || 'i-bx-file'"
    :append-inner-icon="props.field.appendInnerIcon"
    :input-wrapper-classes="props.field.inputWrapperClasses"
    :input-classes="props.field.inputClasses"
    :input-wrapper-attrs="props.field.inputWrapperAttrs"
    :hint="props.field.hint"
    :loading="props.field.loading || loading"
    :readonly="props.field.readonly"
    :disabled="props.field.disabled"
    @click="elFile.click()"
    :model-value="fieldText"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined">

    <template #append-inner>
      <a-btn
        v-if="mediaObject && mediaObject.type?.startsWith('image')"
        variant="light"
        color="primary"
        icon="i-bx-window-open"
        icon-only
        :href="mediaObject.path"
        target="_blank"
        class="rounded-full text-sm">
        <a-menu trigger="hover">
          <img
            :src="mediaObject.variants?.small ?? mediaObject.path"
            class="w-256px"
          />
        </a-menu>
      </a-btn>
    </template>

  </a-input>

  <input
    ref="elFile"
    type="file"
    :key="tickle"
    class="hidden"
    @change="handleFileSelected($event?.target.files?.[0])"
  />

</template>