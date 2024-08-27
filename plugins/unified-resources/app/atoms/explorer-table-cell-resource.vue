<script setup>


/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
});

const emit = defineEmits([

]);


/* resource */

const { resource: item } = useResourceObject({
  resource: () => props.resource,
  resourceId: () => props.resourceId,
});


/* title */

const { title, refresh: refreshitemTitle } = useResourceTitle({
  resource: () => props.resource,
  resourceId: () => props.resourceId,
});


/* view */

async function showResource() {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
    resourceId: props.resourceId,
  });

  if (!result) {
    return;
  }


  refreshitemTitle();

}

</script>


<template>
  <template v-if="props.resource === 'Media'">
    <a target="_blank" :href="item?.path" class="text-primary underline flex items-center gap-2">
      <img
        v-if="item?.type?.startsWith('image')"
        :src="item?.variants?.small ?? item?.path"
        class="w-[32px] h-[32px] inline-block object-contain"
      />
      Media
      <u-dropdown
        v-if="item?.type?.startsWith('image')"
        trigger="hover">
        <img
          :src="item.variants?.small ?? item.path"
          class="w-[150px] border shadow-md"
        />
      </u-dropdown>
    </a>
  </template>
  <template v-else>
    <span
      class="text-primary underline cursor-pointer me-2"
      @click="showResource()">
      {{ title }}
    </span>
  </template>
</template>