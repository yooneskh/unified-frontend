<script setup>

/* interface */

const props = defineProps({
  loading: {
    type: Boolean,
  },
});

const emit = defineEmits([]);


/* template */

</script>


<template>

  <slot v-if="props.loading" name="loading">
    <div class="pa-12 text-center">
      <v-progress-circular
        indeterminate
        size="24"
        color="primary"
      />
    </div>
  </slot>

  <slot v-else />

</template>