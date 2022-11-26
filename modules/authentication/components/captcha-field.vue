<script setup>

import { onMounted, ref } from 'vue';
import { http, generalHttpHandle } from '../../../services/http/mod';


/* interface */

const $p = defineProps({
  modelValue: String,
  id: String
});

const emit = defineEmits([
  'update:modelValue',
  'update:id'
]);


/* captcha */

const captchaSrc = ref('');

async function refreshCaptcha() {

  captchaSrc.value = '';
  emit('update:id', undefined);
  emit('update:modelValue', '');


  const { status, data } = await http.get({
    url: '/captcha-tokens/generate/new'
  }); if (generalHttpHandle(status, data)) return;


  captchaSrc.value = data.svg;
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
      :model-value="$p.modelValue"
      @update:model-value="emit('update:modelValue', $event)"
    />

    <div
      v-html="captchaSrc"
      class="ms-2 me-1 d-block rounded"
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