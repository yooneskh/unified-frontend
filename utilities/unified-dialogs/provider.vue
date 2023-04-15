<script setup>

/* dialogs */

import { useDialogs } from './state';
const dialogs = useDialogs();


/* remove */

function removeDialog(dialog) {

  dialog.modelValue = false;

  setTimeout(() => {
    dialogs.value.splice(
      dialogs.value.findIndex(it => it.key === dialog.key),
      1
    );
  }, 1000);

}

</script>


<template>
  <v-dialog
    v-for="dialog of dialogs"
    :key="dialog.key"
    width="auto"
    v-bind="dialog.options"
    :model-value="dialog.modelValue"
    @update:model-value="!$event && !dialog.options.prominent && (dialog.resolve(undefined) || removeDialog(dialog))">

    <component
      :is="dialog.component"
      v-bind="dialog.props"
      @resolve="dialog.resolve($event); removeDialog(dialog);"
      @reject="dialog.reject($event); removeDialog(dialog);"
      style="max-width: 100%;"
    />

  </v-dialog>
</template>