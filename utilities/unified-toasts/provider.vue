<script setup>

/* toasts */

import { useToasts } from './state';
const toasts = useToasts();


/* actions */

function handleToastFinish(toast, isClick = false) {

  if (toast.clickHandler && isClick) {
    toast.clickHandler();
  }

  if (toast.closeHandler) {
    toast.closeHandler();
  }

  toasts.value.splice( toasts.value.indexOf(toast), 1 )

}


/* template */

import FadingLinearProgress from './fading-linear-progress.vue';

</script>


<template>
  <div class="d-flex flex-column align-center justify-end gap-2 pa-4" style="position: fixed; width: 100%; height: 100%; z-index: 99999999999; pointer-events: none;">
    <transition-group name="list">
      <v-alert
        v-for="toast of toasts" :key="toast.key"
        :type="toast.type"
        :color="toast.color"
        :icon="toast.icon"
        :text="toast.title"
        density="compact"
        elevation="16"
        class="flex-grow-0"
        style="cursor: pointer; position: relative; flex-basis: auto; pointer-events: all;"
        @click="handleToastFinish(toast, true)">

        <fading-linear-progress
          :duration="toast.duration || 5000"
          style="position: absolute;"
          @finished="handleToastFinish(toast)"
        />

      </v-alert>
    </transition-group>
  </div>
</template>


<style scoped>

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

</style>