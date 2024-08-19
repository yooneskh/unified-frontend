<script setup>

/* interface */

const props = defineProps({
  header: Object,
});

const emit = defineEmits([

]);

const modelValue = defineModel();


/* elements */

import ElementMedia from '../../../unified-form-elements/elements/element-media.vue';
import ElementResource from '../../../unified-form-elements/elements/element-resource.vue';

</script>


<template>
  <div>

    <template v-if="['createdAt', 'updatedAt'].includes(props.header.key)" />

    <template v-else-if="props.header.ref === 'Media'">
      <element-media :field="{}" v-model="modelValue">
        <template #append-inner>
          <u-btn
            v-if="modelValue"
            icon="i-mdi-close"
            class="ghost text-xs me-1"
            @click.stop="modelValue = undefined;"
          />
        </template>
      </element-media>
    </template>

    <template v-else-if="props.header.ref">
      <element-resource :field="{ resource: props.header.ref }" v-model="modelValue">
        <template #append-inner>
          <u-btn
            v-if="modelValue"
            icon="i-mdi-close"
            class="ghost text-xs me-1"
            @click.stop="modelValue = undefined;"
          />
        </template>
      </element-resource>
    </template>

    <template v-else-if="props.header.items || props.header.enum">
      <u-select :items="props.header.items || props.header.enum" v-model="modelValue">
        <template #append-inner>
          <u-btn
            v-if="modelValue"
            icon="i-mdi-close"
            class="ghost text-xs me-1"
            @click="modelValue = undefined;"
          />
        </template>
      </u-select>
    </template>
  
    <template v-else>
      <u-input :type="props.header.type === 'number' ? 'number' : 'text'" v-model="modelValue">
        <template #append-inner>
          <u-btn
            v-if="modelValue"
            icon="i-mdi-close"
            class="ghost text-xs me-1"
            @click="modelValue = undefined;"
          />
        </template>
      </u-input>
    </template>

  </div>
</template>