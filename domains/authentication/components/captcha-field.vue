<script setup>

const http = useHttp();


/* interface */

const modelValue = defineModel({
  type: String,
});

const id = defineModel('id', {
  type: String,
});


/* captcha */

const captchaSrc = ref('');

async function refreshCaptcha() {

  captchaSrc.value = '';
  id.value = '';
  modelValue.value = '';


  const { status, data } = await http.request({
    method: 'get',
    url: '/captcha-tokens/generate/new'
  });

  if (generalHttpHandle(status, data)) {
    return;
  }


  captchaSrc.value = data.data;
  id.value = data.captchaId;

}

onMounted(refreshCaptcha);

</script>


<template>

  <div class="d-flex align-center justify-center mt-5">

    <v-text-field
      label="Enter code in front"
      inputmode="numeric"
      hide-details
      v-model="modelValue"
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