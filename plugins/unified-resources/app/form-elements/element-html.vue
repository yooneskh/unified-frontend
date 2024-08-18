<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* ckeditor */

import CKEditor from '@ckeditor/ckeditor5-vue';
const CkeditorComponent = CKEditor.component;

import ClassicEditor from '../assets/js/ckeditor.js';

</script>


<template>
  <div class="field-element-html">

    <u-label
      :text="props.field.label"
      class="ms-1"
    />

    <ckeditor-component
      :editor="ClassicEditor"
      :config="{
        fontSize: {
          options: [
            8,
            12,
            14,
            16,
            20,
            24,
            28,
            32,
            36,
            42,
            48,
            54
          ],
          supportAllValues: true,
        }
      }"
      v-model="modelValue"
    />

  </div>
</template>


<style>
  .ck-powered-by-balloon {
    display: none !important;
  }
  .ck.ck-dropdown.ck-toolbar__grouped-dropdown.ck-toolbar-dropdown > div > div {
    max-width: 512px;
  }
  .ck-list[aria-label="Font Size"] {
    max-height: 256px;
    overflow-y: auto;
  }
  .ck.ck-editor__editable_inline[dir=ltr] {
    text-align: unset;
  }
</style>