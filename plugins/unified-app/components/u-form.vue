<script setup>

/* interface */

const props = defineProps({
  target: Object,
  fields: Array,
  validationStrategy: String,
  gap: String,
});

const isValid = defineModel('isValid', {
  type: Boolean,
});


const emit = defineEmits([

]);


/* integration */

import ElementText from '../../unified-form-elements/elements/element-text.vue';
import ElementTextarea from '../../unified-form-elements/elements/element-textarea.vue';
import ElementSelect from '../../unified-form-elements/elements/element-select.vue';
import ElementCheckbox from '../../unified-form-elements/elements/element-checkbox.vue';
import ElementTagInput from '../../unified-form-elements/elements/element-tag-input.vue';
import ElementDate from '../../unified-form-elements/elements/element-date.vue';
import ElementMedia from '../../unified-form-elements/elements/element-media.vue';
import ElementResource from '../../unified-form-elements/elements/element-resource.vue';
import ElementSeries from '../../unified-form-elements/elements/element-series.vue';

const elements = [
  {
    identifier: 'text',
    component: markRaw(ElementText),
  },
  {
    identifier: 'textarea',
    component: markRaw(ElementTextarea),
  },
  {
    identifier: 'select',
    component: markRaw(ElementSelect),
  },
  {
    identifier: 'checkbox',
    component: markRaw(ElementCheckbox),
  },
  {
    identifier: 'tag-input',
    component: markRaw(ElementTagInput),
  },
  {
    identifier: 'date',
    component: markRaw(ElementDate),
  },
  {
    identifier: 'media',
    component: markRaw(ElementMedia),
  },
  {
    identifier: 'resource',
    component: markRaw(ElementResource),
  },
  {
    identifier: 'series',
    component: markRaw(ElementSeries),
  },
];

const transformers = [
  {
    criterion: f => f.identifier === 'number',
    transducer: f => ({
      ...f,
      identifier: 'text',
      type: 'number',
    }),
  },
];

const valueProcessors = [
  {
    criterion: f => f.identifier === 'text' && f.type !== 'number',
    processor: v => {

      const charsToReplace = [
        ['۰', '0'],
        ['۱', '1'],
        ['۲', '2'],
        ['۳', '3'],
        ['۴', '4'],
        ['۵', '5'],
        ['۶', '6'],
        ['۷', '7'],
        ['۸', '8'],
        ['۹', '9'],
      ];

      for (const pair of charsToReplace) {
        v = v.replaceAll(pair[0], pair[1]);
      }

      return v;

    },
  },
];

const validators = [

];

</script>


<template>
  <u-form-base
    :target="props.target"
    :fields="props.fields"
    :elements="elements"
    :transformers="transformers"
    :value-processors="valueProcessors"
    :validators="validators"
    v-model:is-valid="isValid"
  />
</template>