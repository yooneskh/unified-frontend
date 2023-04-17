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


/* titles */

import { useResourceArrayTitles } from '../composeables/use-resource-title';

const { titles, loading } = useResourceArrayTitles({
  resource: computed(() => props.field.resource),
  resourceIds: computed(() =>
    props.field.multiple ? (props.value ?? []) : (props.value ? [props.value] : [])
  ),
});

const fieldTitle = computed(() =>
  Object.values(titles.value).join(' - ')
);


/* selection */

import ResourceSelectionDialog from '../selection-dialog.vue';
const { launchDialog } = useDialog();

async function launchResourceSelector() {

  const result = await launchDialog({
    component: ResourceSelectionDialog,
    props: {
      resource: props.field.resource,
      multiple: props.field.multiple,
      resourceIds: props.field.multiple ? props.value : (props.value ? [props.value] : []),
    },
  });

  if (!result) {
    return;
  }


  emit('input', props.field.multiple ? result : result[0]);

}


/* template */

</script>


<template>
  <v-text-field
    :label="props.field.label"
    readonly
    :variant="props.field.variant"
    :density="props.field.density"
    :direction="props.field.direction"
    :prepend-icon="props.field.prependIcon"
    :append-icon="props.field.appendIcon"
    :prepend-inner-icon="props.field.prependInnerIcon || 'mdi-file-document'"
    :append-inner-icon="props.field.appendInnerIcon"
    :color="props.field.color"
    :autofocus="props.field.autofocus"
    :placeholder="props.field.placeholder"
    :hint="props.field.hint"
    @click="launchResourceSelector()"
    :loading="loading"
    :model-value="fieldTitle"
    :success="props.success"
    :error="props.error || !!error"
    :messages="props.messages"
    hide-details="auto"
  />
</template>