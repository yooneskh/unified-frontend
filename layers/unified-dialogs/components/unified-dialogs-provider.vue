<script setup>

/* dialogs */

import { useDialogs } from '../states/dialogs';
const dialogs = useDialogs();


/* remove */

function removeDialog(dialog) {

  dialog.modelValue = false;

  setTimeout(() => {
    dialogs.value.splice(
      dialogs.value.findIndex(it => it.key === dialog.key),
      1
    );
  }, 500);

}

</script>


<template>
  <a-dialog
    v-for="dialog of dialogs"
    :key="dialog.key"
    class="w-unset"
    v-bind="dialog.options"
    :model-value="dialog.modelValue"
    @update:model-value="!$event && !dialog.options.persistent && (dialog.resolve(undefined) || removeDialog(dialog))">

    <component
      :is="dialog.component"
      v-bind="dialog.props"
      @resolve="dialog.resolve($event); removeDialog(dialog);"
      @reject="dialog.reject($event); removeDialog(dialog);"
    />

  </a-dialog>
</template>