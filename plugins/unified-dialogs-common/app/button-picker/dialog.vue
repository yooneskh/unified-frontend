<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  classes: String,
  startButtons: Array,
  endButtons: Array,
});

const emit = defineEmits([
  'resolve',
]);


/* button handling */

async function handleButtonClick(button) {

  if (!button.handler) {
    emit('resolve', button.value || button.label);
    return
  }


  try {
    await button.handler();
    emit('resolve', button.value || button.label);
  }
  catch {

  }

}

</script>


<template>
  <u-card
    :icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle"
    :text="props.text"
    :class="props.classes">

    <div class="flex gap-2 mt-4">

      <u-btn
        v-for="button of props.startButtons" :key="button.value"
        :icon="button.icon"
        :label="button.label"
        :append-icon="button.appendIcon"
        :class="button.classes"
        :click-handler="() => handleButtonClick(button)"
      />
      
      <div class="grow" />

      <u-btn
        v-for="button of props.endButtons" :key="button.value"
        :icon="button.icon"
        :label="button.label"
        :append-icon="button.appendIcon"
        :class="button.classes"
        :click-handler="() => handleButtonClick(button)"
      />

    </div>

  </u-card>
</template>