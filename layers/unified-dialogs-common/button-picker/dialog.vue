<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  startButtons: Array,
  endButtons: Array,
  isReversed: Boolean,
});

const emit = defineEmits([
  'resolve',
]);


/* button handling */

const loadingButtons = reactive({});

async function handleButtonClick(button) {

  if (!button.handler) {
    emit('resolve', button.value ?? button.title);
    return
  }


  loadingButtons[button.value ?? button.title] = true;

  try {
    await button.handler();
    emit('resolve', button.value ?? button.title);
  }
  catch {}

  loadingButtons[button.value ?? button.title] = false;

}

</script>


<template>
  <a-card
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle">

    <p v-if="props.text" class="a-card-body">
      {{ props.text }}
    </p>

    <div class="flex items-end gap-2 pa-2" :class="{ 'flex-row-reverse': props.isReversed }">

      <a-btn
        v-for="button of props.startButtons" :key="button.value || button.title"
        :variant="button.variant"
        :icon="button.icon"
        :append-icon="button.appendIcon"
        :color="button.color"
        :loading="loadingButtons[button.value ?? button.title]"
        @click="handleButtonClick(button)">
        {{ button.title }}
      </a-btn>
      
      <div class="grow" />

      <a-btn
        v-for="button of props.endButtons" :key="button.value || button.title"
        :variant="button.variant"
        :icon="button.icon"
        :append-icon="button.appendIcon"
        :color="button.color"
        :loading="loadingButtons[button.value ?? button.title]"
        @click="handleButtonClick(button)">
        {{ button.title }}
      </a-btn>

    </div>

  </a-card>
</template>