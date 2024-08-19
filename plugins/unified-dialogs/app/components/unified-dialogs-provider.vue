<script setup>

/* dialogs */

import { useDialogs } from '../states/dialogs';
const dialogs = useDialogs();


/* remove */

function onDialogToggled(dialog, state) {

  if (state || dialog.options.persistent) {
    return;
  }

  dialog.resolve(undefined);
  removeDialog(dialog);

}

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
  <u-dialog
    v-for="dialog of dialogs" :key="dialog.key"
    v-bind="dialog.options"
    :model-value="dialog.modelValue"
    @update:model-value="onDialogToggled(dialog, $event)">

    <component
      :is="dialog.component"
      class="max-w-full"
      v-bind="dialog.props"
      @resolve="dialog.resolve($event); removeDialog(dialog);"
      @reject="dialog.reject($event); removeDialog(dialog);"
    />

  </u-dialog>
</template>