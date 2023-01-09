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
  <v-card
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle">

    <v-card-text v-if="props.text">
      {{ props.text }}
    </v-card-text>

    <v-card-actions :class="{ 'flex-row-reversed': props.isReversed }">

      <v-btn
        v-for="(button, index) of props.startButtons" :key="index"
        :prepend-icon="button.icon"
        :color="button.color"
        :loading="loadingButtons[button.value ?? button.title]"
        @click="handleButtonClick(button)">
        {{ button.title }}
      </v-btn>

      <v-spacer />

      <v-btn
        v-for="(button, index) of props.endButtons" :key="index"
        :prepend-icon="button.icon"
        :color="button.color"
        :loading="loadingButtons[button.value ?? button.title]"
        @click="handleButtonClick(button)">
        {{ button.title }}
      </v-btn>

    </v-card-actions>

  </v-card>
</template>