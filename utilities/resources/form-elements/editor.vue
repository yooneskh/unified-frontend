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


/* dialog */

const isDialogOpened = ref(false);


/* variants */

const hasVariants = computed(() =>
  !!props.field.variants
);

const variants = computed(() =>
  Object.keys(props.field.variants ?? {})
);


const selectedVariant = ref(variants.value[0]);


/* options */

const options = reactive({
  config: {},
  parts: [],
});


function tryLoad() {
  try {

    const opts = JSON.parse(( (hasVariants.value) ? (props.value?.[selectedVariant.value]) : (props.value)) ?? '{}');

    options.config = opts.config ?? {};
    options.parts  = opts.parts ?? [];

  }
  catch (error) {
    console.error(error);
    options.config = {};
    options.parts  = [];
  }
}


watch([options], () => {
  emit('input', JSON.stringify(options), selectedVariant.value);
});


/* ckeditor */

import CKEditor from '@ckeditor/ckeditor5-vue';
const CkeditorComponent = CKEditor.component;

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


/* template */

const makeUuid = inject('makeUuid');

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
      @click="isDialogOpened = true; tryLoad();">
      Open Editor
    </v-btn>


    <v-dialog v-model="isDialogOpened" width="100%" height="100%">
      <v-card
        prepend-icon="mdi-pencil-box-outline"
        title="Editor"
        subtitle="Curate your content"
        width="100%" height="100%">

        <template #append>

          <v-btn
            v-if="hasVariants"
            variant="tonal"
            prepend-icon="mdi-translate"
            class="me-2">

            {{ selectedVariant }}

            <v-menu activator="parent">
              <v-list density="comfortable">
                <v-list-item
                  v-for="variant of variants" :key="variant"
                  :title="variant"
                  @click="selectedVariant = variant; tryLoad();"
                />
              </v-list>
            </v-menu>

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

        <template v-if="options.parts.length === 0">
          <div class="text-caption text-center py-12">
            No parts added yet.
          </div>
        </template>

        <template v-else>
          <template v-for="part of options.parts" :key="part.key">

            <div v-if="part.type === 'text'" class="py-4 px-10">
              <ckeditor-component
                :editor="ClassicEditor"
                v-model="part.text"
              />
            </div>

          </template>
        </template>


        <v-divider class="mb-4" />

        <div class="text-body-1 text-center">
          Add Part
        </div>

        <div class="mx-auto d-inline-block d-flex" style="padding: 6px; gap: 6px;">

          <v-btn variant="tonal" rounded="pill" color="primary" prepend-icon="mdi-text" @click="options.parts.push({ key: makeUuid(), type: 'text', text: '' })">
            Text
          </v-btn>

          <v-btn variant="tonal" rounded="pill" color="primary" prepend-icon="mdi-image" @click="handleAddImage();">
            Image
          </v-btn>

        </div>

      </v-card>
    </v-dialog>

  </div>
</template>