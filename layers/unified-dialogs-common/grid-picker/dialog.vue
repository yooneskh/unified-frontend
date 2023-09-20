<script setup>

const props = defineProps({
  icon: String,
  title: String,
  subtitle: String,
  text: String,
  items: Array,
  selectedItem: String,
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

      <p class="mb-4">
        {{ props.text }}
      </p>

      <div v-if="props.items" class="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <a-card
          v-for="item of props.items" :key="item.value || item"
          variant="outline"
          :color="props.selectedItem && (item.value === props.selectedItem || item === props.selectedItem) ? 'primary' : 'neutral'"
          states
          class="shadow-md pa-2 text-center cursor-pointer"
          @click="emit('resolve', item.value || item.title || item)">

          <template v-if="item.icon">
            <a-icon :icon="item.icon" />
          </template>

          <template v-else>
            <div>
              {{ item.title || item }}
            </div>
          </template>

        </a-card>
      </div>

    </div>

  </a-card>
</template>