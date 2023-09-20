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
    ...(modelValue.value || []),
    JSON.parse(JSON.stringify( props.field.itemBase ?? {} )),
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
  <div class="form-element-series border border-slate-300 rounded">

    <p class="text-sm flex items-center gap-3 py-2 px-3 border-b border-slate-300">

      <span class="font-bold">
        {{ props.field.label }}
      </span>

      <span class="text-xs">
        ({{ (modelValue?.length > 0) ? (`${modelValue.length} items`) : ('No items') }})
      </span>

      <a-btn
        variant="light"
        color="primary"
        icon="i-bx-plus"
        class="text-xs rounded-full"
        @click="handleAddItem()">
        Item
      </a-btn>

    </p>

    <template v-if="!modelValue || !(modelValue.length > 0)">
      <p class="text-sm text-center py-4">
        No Items
      </p>
    </template>

    <div
      v-else
      class="pa-3 grid gap-3"
      :class="{
        'grid-cols-1': props.field.seriesColumns === 1 || !props.field.seriesColumns,
        'grid-cols-2': props.field.seriesColumns === 2,
        'grid-cols-3': props.field.seriesColumns === 3,
        'grid-cols-4': props.field.seriesColumns === 4,
        'grid-cols-5': props.field.seriesColumns === 5,
        'grid-cols-6': props.field.seriesColumns === 6,
        'grid-cols-7': props.field.seriesColumns === 7,
        'grid-cols-8': props.field.seriesColumns === 8,
        'grid-cols-9': props.field.seriesColumns === 9,
        'grid-cols-10': props.field.seriesColumns === 10,
        'grid-cols-11': props.field.seriesColumns === 11,
        'grid-cols-12': props.field.seriesColumns === 12,
      }">
      <div
        v-for="(item, index) of modelValue" :key="index"
        :cols="props.field.itemWidth || 12"
        class="relative">

        <u-form
          :target="item"
          :fields="props.field.itemFields"
          class="border rounded border-slate-300 pa-2"
        />

        <div class="series-item-actions flex gap-1">

          <a-btn
            v-if="index > 0"
            variant="light"
            icon="i-bx-chevron-left"
            icon-only
            class="text-xs rounded-full"
            @click="handleMoveItem(item, index, -1)"
          />

          <a-btn
            v-if="index < modelValue.length - 1"
            variant="light"
            icon="i-bx-chevron-right"
            icon-only
            class="text-xs rounded-full"
            @click="handleMoveItem(item, index, 1)"
          />

          <a-btn
            variant="light"
            color="danger"
            icon="i-bx-x"
            icon-only
            class="text-xs rounded-full"
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