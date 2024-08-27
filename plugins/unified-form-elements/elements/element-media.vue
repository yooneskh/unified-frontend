<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* file */

import MediaGallery from '../atoms/media-gallery.vue';


const loading = ref(false);
const mediaObject = ref(undefined);

const fieldText = computed(() =>
  !mediaObject.value ? '' : `${mediaObject.value.name}.${mediaObject.value.extension}`
);


async function openMediaSelector() {

  const result = await launchDialog({
    component: MediaGallery,
  });

  if (!result) {
    return;
  }


  modelValue.value = result;

}


watch(modelValue, async () => {

  mediaObject.value = undefined;

  if (!modelValue.value) {
    return;
  }


  const data = await ufetch(`/media/${modelValue.value}`, {
    loading,
  });


  mediaObject.value = data;

}, { immediate: true });


/* template */

</script>


<template>
  <u-input
    v-bind="$attrs"
    :label="props.field.label"
    :placeholder="props.field.placeholder"
    :icon="props.field.icon"
    :inner-icon="props.field.innerIcon  || 'i-mdi-file'"
    :append-icon="props.field.appendIcon"
    :inner-append-icon="props.field.InnerAppendIcon"
    :input-classes="props.field.inputClasses"
    :message="props.field.message"
    :loading="props.field.loading || loading"
    :readonly="props.field.readonly"
    :disabled="props.field.disabled"
    @click.self="openMediaSelector()"
    :model-value="fieldText"
    :error="props.error ? props.messages?.join(' - ') : undefined"
    :success="props.success ? props.messages?.join(' - ') : undefined">

    <template #append>
      <nuxt-link
        v-if="mediaObject && mediaObject.type?.startsWith('image')"
        :href="mediaObject.path"
        target="_blank"
        class="flex items-center gap-2 pe-4"
        @click.stop>

        <img
          :src="mediaObject.variants?.small ?? mediaObject.path"
          class="h-[32px] w-[32px] inline-block object-contain"
        />
  
        <u-btn
          icon="i-mdi-open-in-new"
          class="soft primary"
        />
  
        <u-dropdown trigger="hover">
          <img
            :src="mediaObject.variants?.small ?? mediaObject.path"
            class="w-[256px]"
          />
        </u-dropdown>
  
      </nuxt-link>
    </template>

    <template #append-inner>
      <slot name="append-inner" />
    </template>

  </u-input>
</template>