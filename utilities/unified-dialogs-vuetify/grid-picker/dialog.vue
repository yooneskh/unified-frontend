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
  <v-card
    :prepend-icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle">

    <v-card-text v-if="props.text">
      {{ props.text }}
    </v-card-text>

    <v-row class="ma-0">
      <v-col
        v-for="item of props.items" :key="item.value || item"
        cols="6" sm="4" md="3">
        <v-card
          class="pa-3 text-center"
          :color="props.selectedItem && (item.value === props.selectedItem || item === props.selectedItem) ? 'primary' : undefined"
          @click="emit('resolve', item.value || item.title || item)">

          <template v-if="item.icon">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </template>

          <template v-else>
            <div class="text-body-1">
              {{ item.title || item }}
            </div>
          </template>

        </v-card>
      </v-col>
    </v-row>

  </v-card>
</template>