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

</script>


<template>
  <teleport to="body">
    <div class="flex flex-col items-center justify-end gap-2 pa-4 fixed inset-0 pointer-events-none z-[5000000]">
      <transition-group name="list">
        <u-alert
          v-for="toast of toasts" :key="toast.key"
          :icon="toast.icon"
          :text="toast.title"
          class="fill cursor-pointer relative pointer-events-auto"
          :class="[toast.color]"
          @click="handleToastFinish(toast, true)">
  
          <fading-linear-progress
            :duration="toast.duration || 5000"
            class="absolute top-[1px] inset-x-[6px]"
            @finished="handleToastFinish(toast)"
          />
  
        </u-alert>
      </transition-group>
    </div>
  </teleport>
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