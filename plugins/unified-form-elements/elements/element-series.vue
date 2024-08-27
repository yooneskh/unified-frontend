<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* actions */

function handleAddItem() {
  modelValue.value = [
    ...(Array.isArray(modelValue.value) ? modelValue.value : []),
    JSON.parse(JSON.stringify( props.field.itemBase ?? {} )),
  ];
}

function handleDuplicateItem(item, index) {
  modelValue.value = [
    ...(modelValue.value.slice(0, index + 1)),
    {
      ...modelValue.value[index],
      _id: undefined,
    },
    ...(modelValue.value.slice(index + 1)),
  ];
}

function handleDeleteItem(item, itemIndex) {
  modelValue.value = modelValue.value.filter((_, index) => itemIndex !== index);
}

function handleMoveItem(item, index, direction) {

  const items = [ ...modelValue.value ];
  const poppedItem = items.splice(index, 1)[0];

  items.splice(index + direction, 0, poppedItem);

  modelValue.value = items;

}


/* template */

</script>


<template>
  <div class="form-element-series border">

    <p class="text-sm flex items-center gap-3 py-2 px-3 border-b">

      <span class="font-bold">
        {{ props.field.label }}
      </span>

      <span class="text-xs">
        ({{ (modelValue?.length > 0) ? (`${modelValue.length} items`) : ('No items') }})
      </span>

      <u-btn
        icon="i-mdi-plus"
        label="Item"
        class="soft primary text-xs py-1"
        @click="handleAddItem()"
      />

    </p>

    <template v-if="!modelValue || !(modelValue.length > 0)">
      <p class="text-sm text-center py-4">
        No Items
      </p>
    </template>

    <div
      v-else
      class="p-3 grid gap-3"
      :class="{
        'grid-cols-1': props.field.seriesColumns === 1 || !props.field.seriesColumns,
        'grid-cols-2': props.field.seriesColumns === 2,
        'grid-cols-3': props.field.seriesColumns === 3,
        'grid-cols-4': props.field.seriesColumns === 4,
      }">
      <div
        v-for="(item, index) of modelValue" :key="index"
        :cols="props.field.itemWidth || 12"
        class="relative">

        <u-form
          :target="item"
          :fields="props.field.itemFields"
          class="border p-2"
        />

        <div class="series-item-actions flex gap-1">

          <u-btn
            icon="i-mdi-content-copy"
            class="soft text-xs aspect-1 p-1"
            @click="handleDuplicateItem(item, index)"
          />

          <u-btn
            v-if="index > 0"
            icon="i-mdi-chevron-left"
            class="soft text-xs aspect-1 p-1"
            @click="handleMoveItem(item, index, -1)"
          />

          <u-btn
            v-if="index < modelValue.length - 1"
            icon="i-mdi-chevron-right"
            class="soft text-xs aspect-1 p-1"
            @click="handleMoveItem(item, index, 1)"
          />

          <u-btn
            icon="i-mdi-close"
            class="soft danger text-xs aspect-1 p-1"
            @click="handleDeleteItem(item, index)"
          />

        </div>

      </div>
    </div>

  </div>
</template>


<style scoped>

  .series-item-actions {

    position: absolute;

    top: 8px;
    inset-inline-end: 8px;

    opacity: 0;
    pointer-events: none;

    transition: all 300ms ease-in-out;

  }

  div:hover > .series-item-actions {
    opacity: 1;
    pointer-events: unset;
  }

</style>