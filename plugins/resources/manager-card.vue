<script setup>

/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
});

const emit = defineEmits([]);


/* template */

</script>


<template>
  <v-card :prepend-icon="props.icon" :title="props.title">

    <v-card-text>
      {{ props.resource }}
    </v-card-text>

  </v-card>
</template>