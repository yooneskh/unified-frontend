<script setup>

/* interface */

const props = defineProps({
  duration: {
    type: Number
  },
  step: {
    type: Number,
    default: 25,
  },
});

const emit = defineEmits([
  'finished'
]);


/* fading */

const currentValue = ref(props.duration)

let timerHandler = setInterval(() => {

  currentValue.value -= props.step;

  if (currentValue.value <= 0) {
    clearInterval(timerHandler);
    emit('finished');
  }

}, props.step);

onUnmounted(() => {
  clearInterval(timerHandler);
})


/* template */

</script>


<template>
  <v-progress-linear
    :model-value="currentValue"
    :max="props.duration"
    height="3"
    color="rgba(0, 0, 0, 0.2)"
  />
</template>