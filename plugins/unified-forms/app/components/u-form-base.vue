<script setup>

/* interface */

const props = defineProps({
  target: Object,
  fields: Array,
  validationStrategy: {
    type: String,
    default: 'dirty',
  },
  gap: {
    type: [Number, String],
    default: '12px',
  },
  elements: Array,
  transformers: Array,
  valueProcessors: Array,
  validators: Array,
});

const isValid = defineModel('isValid', {
  type: Boolean,
});


const emit = defineEmits([

]);


/* breakpoints */

import { useWindowSize } from '@vueuse/core';
const { width: windowWidth } = useWindowSize();

const breakpoints = {
  'xs': 640,
  'sm': 768,
  'md': 1024,
  'lg': 1280,
  'xl': 1536,
};


const currentBreakpoint = computed(() => {

  for (const key in breakpoints) {
    if (windowWidth.value < breakpoints[key]) {
      return key;
    }
  }

  return '2xl';

});


function getColsFor(field) {

  if (field.identifier === 'empty') {
    return field.width;
  }

  if (field.preemptWidth) {
    return field.preemptWidth;
  }

  if (currentBreakpoint.value === 'xs') {
    return field.width?.xs ?? 12;
  }

  return field.width?.[currentBreakpoint.value] ?? field.width ?? 12;

}


/* fields */

import { matches } from 'unified-mongo-filter';

const memoizedFields = ref([]);


watch(() => props.fields, () => {
  if (JSON.stringify(props.fields) !== JSON.stringify(memoizedFields.value)) {
    memoizedFields.value = props.fields;
  }
}, { immediate: true });


const transformedFields = computed(() => {

  const result = [];

  for (let i = 0; i < memoizedFields.value.length; i++) {

    let field = memoizedFields.value[i];

    while (true) {

      const transformer = props.transformers?.find(it => it.criterion(field));
      if (!transformer) break;

      field = transformer.transducer(field);

    }

    result.push(field);

  }

  return result;

});

const filteredFields = computed(() =>
  transformedFields.value.filter(field =>
    !field.vIf || matches(field.vIf, props.target)
  )
);

const rowedFields = computed(() => {

  const result = [];

  let currentRow = [];
  let currentRowLength = 0;

  for (const field of filteredFields.value) {

    const fieldWidth = getColsFor(field);


    if (currentRowLength + fieldWidth <= 12) {
      currentRow.push(field);
      currentRowLength += fieldWidth;
      continue;
    }


    if (currentRowLength < 12 && currentRowLength > 0) {
      currentRow.push({
        identifier: 'empty',
        width: 12 - currentRowLength,
      });
    }


    result.push(currentRow);

    currentRow = [field];
    currentRowLength = fieldWidth;

  }


  if (currentRowLength > 0) {

    if (currentRowLength < 12) {
      currentRow.push({
        identifier: 'empty',
        width: 12 - currentRowLength
      });
    }

    result.push(currentRow);

  }


  return result;

});


const dirtyFields = reactive({});

function handleElementInput(field, input, variant) {

  for (const item of props.valueProcessors ?? []) {
    if (item.criterion(field, input)) {
      input = item.processor(input, field);
    }
  }


  if (field.variants) {
    input = {
      ...(props.target?.[field.key] ?? {}),
      [variant]: input,
    };
  }


  props.target[field.key] = input;

  dirtyFields[field.key] = true;

}


const validations = computed(() => {

  const result = {};

  for (const field of filteredFields.value) {

    if (!field.rules || field.rules.length === 0) {
      continue;
    }


    const fieldValidationResults = [];

    for (const ruler of field.rules) {
      if (typeof ruler === 'function') {

        const matchResult = ruler(props.target[field.key]);

        fieldValidationResults.push(matchResult);

        if (!matchResult || typeof matchResult === 'string') {
          break;
        }

      }
      else if (typeof ruler === 'string') {

        const validator = props.validators?.find(it => it.key === ruler);

        if (!validator) {
          console.warn(`${ruler} validator was used but was not registered.`);
          continue;
        }

        const matchResult = validator.validator(props.target[field.key]);

        fieldValidationResults.push(matchResult);

        if (!matchResult || typeof matchResult === 'string') {
          break;
        }

      }
      else if (Array.isArray(ruler)) {

        if (ruler.length !== 2 || typeof ruler[0] !== 'string' || typeof ruler[1] !== 'string') {
          console.warn('array rules must be two elements and both be strings. this was given', ruler);
          break;
        }


        const validator = props.validators?.find(it => it.key === ruler[0]);

        if (!validator) {
          console.warn(`${ruler[0]} validator was used but was not registered.`);
          continue;
        }

        const matchResult = validator.validator(props.target[field.key]);

        if (!matchResult || typeof matchResult === 'string') {
          fieldValidationResults.push(ruler[1]);
          break;
        }

        fieldValidationResults.push(matchResult);

      }
      else if (typeof ruler === 'object') {

        const matched = matches(ruler.criteria, props.target[field.key]);

        if (!matched) {
          fieldValidationResults.push(ruler.message);
          break;
        }
        else {
          fieldValidationResults.push(true);
        }

      }
    }


    result[field.key] = fieldValidationResults;

  }


  return result;

});

watch(validations, () => {
  isValid.value = (
    Object.keys(validations.value).every(key => (
      validations.value[key].every(it => it === true)
    ))
  );
}, { immediate: true });


/* template */

const gap = computed(() =>
  !isNaN(props.gap) ? `${props.gap}px` : props.gap
);

</script>


<template>
  <form class="unified-form" @submit.prevent>
    <div
      v-for="(fieldRow, index) of rowedFields" :key="index"
      class="row">
      <div
        v-for="field of fieldRow" :key="field.key"
        :class="[ `col-${getColsFor(field)}` ]">

        <template v-if="field.identifier !== 'empty'">
          <component
            :is="props.elements?.find(it => it.identifier === field.identifier)?.component"
            :field="field"
            :model-value="props.target[field.key]"
            @update:model-value="(input, variant) => handleElementInput(field, input, variant)"
            :success="validations[field.key]?.every(it => it === true)"
            :error="(props.validationStrategy !== 'dirty' || dirtyFields[field.key]) && validations[field.key]?.some(it => typeof it === 'string' || it === false)"
            :messages="(props.validationStrategy !== 'dirty' || dirtyFields[field.key]) ? validations[field.key]?.filter(it => typeof it === 'string') : []"
          />
        </template>

      </div>
    </div>
  </form>
</template>


<style scoped>

  .row {
    display: flex;
    flex-direction: row;
    gap: v-bind(gap);
  }

  .row + .row {
    margin-top: v-bind(gap);
  }

  .row > * {
    width: 0;
  }

  .col-1  { flex-basis: calc(100% * (1  / 12)); }
  .col-2  { flex-basis: calc(100% * (2  / 12)); }
  .col-3  { flex-basis: calc(100% * (3  / 12)); }
  .col-4  { flex-basis: calc(100% * (4  / 12)); }
  .col-5  { flex-basis: calc(100% * (5  / 12)); }
  .col-6  { flex-basis: calc(100% * (6  / 12)); }
  .col-7  { flex-basis: calc(100% * (7  / 12)); }
  .col-8  { flex-basis: calc(100% * (8  / 12)); }
  .col-9  { flex-basis: calc(100% * (9  / 12)); }
  .col-10 { flex-basis: calc(100% * (10 / 12)); }
  .col-11 { flex-basis: calc(100% * (11 / 12)); }
  .col-12 { flex-basis: calc(100% * (12 / 12)); }

</style>