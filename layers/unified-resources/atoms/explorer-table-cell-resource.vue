<script setup>


/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
});

const emit = defineEmits([

]);


/* resource */

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});

const { resource: item } = useResourceObject({
  resource: computed(() => props.resource),
  resourceId: computed(() => props.resourceId),
});


/* title */

const { title, refresh: refreshitemTitle } = useResourceTitle({
  resource: computed(() => props.resource),
  resourceId: computed(() => props.resourceId),
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


/* template */

</script>


<template>
  <template v-if="props.resource === 'Media'">
    <a target="_blank" :href="item?.path" class="text-primary underline">

      Media

      <a-menu
        v-if="item?.type.startsWith('image')"
        trigger="hover">
        <img
          :src="item.variants?.small ?? item.path"
          class="w-150px"
        />
      </a-menu>

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