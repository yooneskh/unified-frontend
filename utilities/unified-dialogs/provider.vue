<script setup>

/* dialogs */

const dialogs = useDialogs();
import { useDialogs } from './state';


/* remove */

function removeDialog(dialog) {

  dialog.modelValue = false;

  setTimeout(() => {
    dialogs.splice(
      dialogs.findIndex(it => it.id === dialog.id),
      1
    );
  }, 1000);

}

</script>


<template>
  <v-dialog
    v-for="dialog of dialogs"
    :key="dialog.key"
    v-bind="dialog.options"
    width="auto"
    :model-value="dialog.modelValue"
    @update:model-value="!$event && !dialog.options.prominent && removeDialog(dialog)">

    <component
      :is="dialog.component"
      v-bind="dialog.props"
      @resolve="dialog.resolve($event); removeDialog(dialog);"
      @reject="dialog.reject($event ?? undefined); removeDialog(dialog);"
    />

  </v-dialog>
</template>