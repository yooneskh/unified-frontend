<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  items: Array,
});

const emit = defineEmits([
  'resolve',
]);

</script>


<template>
  <a-card
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle">

    <div v-if="props.text" class="a-card-body">
      {{ props.text }}
    </div>

    <a-list v-if="props.items">
      <a-list-item
        v-for="item of props.items" :key="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :subtitle="item.subtitle"
        :text="item.text"
        :color="item.color"
        @click="emit('resolve', item.value || item.title || item)"
      />
    </a-list>

  </a-card>
</template>