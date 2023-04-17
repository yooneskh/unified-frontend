<script setup>

const { http, generalHttpHandle } = useHttp();


/* interface */

const props = defineProps({
  modelValue: String,
  id: String,
});

const emit = defineEmits([
  'update:modelValue',
  'update:id',
]);


/* captcha */

const captchaSrc = ref('');

async function refreshCaptcha() {

  captchaSrc.value = '';
  emit('update:id', undefined);
  emit('update:modelValue', '');


  const { status, data } = await http.request({
    method: 'get',
    url: '/captcha-tokens/generate/new'
  });

  if (generalHttpHandle(status, data)) {
    return;
  }


  captchaSrc.value = data.data;
  emit('update:id', data.captchaId);

}

onMounted(refreshCaptcha);

</script>


<template>

  <div class="d-flex align-center justify-center mt-5">

    <v-text-field
      label="Enter code in front"
      dir="ltr"
      inputmode="numeric"
      hide-details
      :model-value="props.modelValue"
      @update:model-value="emit('update:modelValue', $event)"
    />

    <v-img
      :src="captchaSrc"
      class="flex-grow-0 ms-4 rounded"
      style="width: 120px; height: 40px; padding: 8px; background: white;"
    />

    <v-btn
      variant="tonal"
      icon="mdi-refresh"
      class="ms-1 rounded-lg"
      @click="refreshCaptcha()"
    />

  </div>

</template>