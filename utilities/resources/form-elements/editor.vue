<script setup>

/* interface */

const props = defineProps({
  field: Object,
  value: {},
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const emit = defineEmits([
  'input',
]);


const isDialogOpened = ref(false);


/* template */

</script>


<template>
  <div class="form-element-editor">

    <v-label class="d-block text-body-2">
      {{ props.field.label }}
    </v-label>

    <v-btn
      variant="tonal"
      color="primary"
      block
      prepend-icon="mdi-pencil-box-outline"
      @click="isDialogOpened = true;">
      Open Editor
    </v-btn>


    <v-dialog v-model="isDialogOpened" width="100%" height="100%">
      <v-card
        prepend-icon="mdi-pencil-box-outline"
        title="Editor"
        subtitle="Curate your content"
        width="100%" height="100%">

        <template #append>

          <v-btn flat color="primary" prepend-icon="mdi-check">
            Confirm
          </v-btn>

          <v-btn
            variant="text"
            color="error"
            icon="mdi-close"
            density="comfortable"
            class="ms-3"
            @click="isDialogOpened = false;"
          />

        </template>

      </v-card>
    </v-dialog>

  </div>
</template>