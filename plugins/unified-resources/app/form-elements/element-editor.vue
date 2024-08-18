<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* dialog */

const isDialogOpened = ref(false);


/* options */

const options = reactive({
  config: {},
  parts: [],
});


function tryLoad() {
  try {

    const opts = JSON.parse(modelValue.value ?? '{}');

    options.config = opts.config ?? {};
    options.parts  = opts.parts ?? [];

  }
  catch (error) {
    console.error(error);
    options.config = {};
    options.parts = [];
  }
}


watch([options], () => {
  modelValue.value = JSON.stringify(options);
});


/* image */

async function handleAddImage() {
  launchFormPickerDialog({
    icon: 'i-mdi-image',
    title: 'Choose Image',
    subtitle: 'Add image to content',
    text: 'Choose your image to be added.',
    fields: [
      {
        key: 'file', identifier: 'media', label: 'File',
        rules: [
          v => !!v || 'File is required!',
        ],
      },
    ],
    options: {
      backdropClasses: 'w-[512px]',
    },
    async submitHandler(form) {

      const data = await ufetch(`/media/${form.file}`);


      options.parts.push({
        key: makeUuid(),
        type: 'image',
        images: {
          full: data.path,
          large: data.variants.large,
          medium: data.variants.medium,
          small: data.variants.small,
        },
      });

    }
  });
}


/* ordering */

function handleMovePart(part, index, direction) {

  const newParts = [...options.parts];

  const movedPart = newParts.splice(index, 1)[0];
  newParts.splice(index + direction, 0, movedPart);

  options.parts = newParts;

}


/* ckeditor */

import CKEditor from '@ckeditor/ckeditor5-vue';
const CkeditorComponent = CKEditor.component;

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


/* template */

</script>


<template>
  <div class="form-element-editor">

    <!-- <v-label class="d-block text-body-2">
      {{ props.field.label }}
    </v-label>

    <v-btn
      variant="tonal"
      color="primary"
      block
      prepend-icon="mdi-pencil-box-outline"
      @click="isDialogOpened = true; tryLoad();">
      Open Editor
    </v-btn> -->
    <!-- <u-input
      :label="props.field.label">

    </u-input> -->
    <u-label
      :text="props.field.label"
    />

    <u-btn
      variant="soft"
      color="primary"
      icon="i-mdi-pencil-box-outline"
    />


    <template v-if="false">
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
  
          <v-divider class="mt-3" />
  
  
          <template v-if="options.parts.length === 0">
            <div class="text-caption text-center py-12">
              No parts added yet.
            </div>
          </template>
  
          <template v-else>
            <div v-for="(part, index) of options.parts" class="editor-element" :key="part.key">
  
              <div v-if="part.type === 'text'" class="py-4 px-10">
                <ckeditor-component
                  :editor="ClassicEditor"
                  v-model="part.text"
                />
              </div>
  
              <div v-if="part.type === 'image'" class="py-4 px-10">
                <v-img
                  :src="part.images[part.variant]"
                  :max-width="part.maxWidth"
                  class="mx-auto"
                />
              </div>
  
              <div class="actions d-flex" style="gap: 4px;">
  
                <v-btn
                  variant="tonal"
                  color="primary"
                  size="small"
                  density="comfortable"
                  icon="mdi-chevron-down"
                  @click="handleMovePart(part, index, 1)"
                />
  
                <v-btn
                  variant="tonal"
                  color="primary"
                  size="small"
                  density="comfortable"
                  icon="mdi-chevron-up"
                  @click="handleMovePart(part, index, -1)"
                />
  
                <v-btn
                  variant="tonal"
                  color="error"
                  size="small"
                  density="comfortable"
                  icon="mdi-close"
                  @click="options.parts.splice(index, 1)"
                />
  
              </div>
  
            </div>
          </template>
  
  
          <v-divider class="mb-4" />
  
          <div class="text-body-1 text-center">
            Add Part
          </div>
  
          <div class="mx-auto d-inline-block d-flex mb-8" style="padding: 6px; gap: 6px;">
  
            <v-btn variant="tonal" rounded="pill" color="primary" prepend-icon="mdi-text" @click="options.parts.push({ key: makeUuid(), type: 'text', text: '<p>Enter your text here</p>' })">
              Text
            </v-btn>
  
            <v-btn variant="tonal" rounded="pill" color="primary" prepend-icon="mdi-image" @click="handleAddImage();">
              Image
            </v-btn>
  
          </div>
  
        </v-card>
      </v-dialog>
    </template>

  </div>
</template>


<style scoped>

  .editor-element {
    position: relative;
  }

  .editor-element .actions {

    position: absolute;

    top: 12px;
    inset-inline-end: 12px;

    opacity: 0;
    pointer-events: none;
    transition: all 300ms ease-in-out;

  }

  .editor-element:hover .actions {
    opacity: 1;
    pointer-events: unset;
  }

</style>