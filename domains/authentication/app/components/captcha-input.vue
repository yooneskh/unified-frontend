<script setup>

/* interface */

const props = defineProps({

});

const emit = defineEmits([

]);


const captchaId = defineModel('captchaId');
const captchaText = defineModel('captchaText');


/* captcha */

const { data: captchaData, refresh } = useUFetch(`/captcha-tokens/`, {
  method: 'post',
});

watch(() => captchaData.value?.captchaId, () => {
  captchaId.value = captchaData.value?.captchaId;
}, { immediate: true });

</script>


<template>
  <div>

    <u-input
      label="Enter the text below"
      v-model="captchaText"
    />

    <div class="flex items-center justify-center gap-1 mt-1">

      <!-- <img
        :src="captchaData?.captchaData"
      /> -->

      <div v-html="captchaData?.captchaData" class="w-[150px] h-[50px]" />


      <u-btn
        icon="i-mdi-refresh"
        class="ghost neutral"
        @click="refresh();"
      />

    </div>

  </div>
</template>