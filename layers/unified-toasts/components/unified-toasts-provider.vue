<script setup>

/* toasts */

import { useToasts } from '../states/toasts';
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

</script>


<template>
  <div class="flex flex-col items-center justify-end gap-2 pa-4 fixed inset-0 pointer-events-none z-5000000">
    <transition-group name="list">
      <a-alert
        v-for="toast of toasts" :key="toast.key"
        :color="toast.color"
        :icon="toast.icon"
        class="cursor-pointer relative pointer-events-auto w-unset"
        @click="handleToastFinish(toast, true)">

        <fading-linear-progress
          :duration="toast.duration || 5000"
          class="absolute top-1px inset-x-6px rounded-full"
          @finished="handleToastFinish(toast)"
        />

        <div class="text-sm font-bold">
          {{ toast.title }}
        </div>

      </a-alert>
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