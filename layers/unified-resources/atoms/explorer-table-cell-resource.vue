<script setup>


/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
});

const emit = defineEmits([]);


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

  const result = await launchDialog({
    component: defineAsyncComponent(() =>
      import('../dialogs/object-dialog.vue')
    ),
    props: {
      resource: props.resource,
      resourceId: props.resourceId,
    },
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
    <a target="_blank" :href="item?.path">
      Media
      <v-menu v-if="item?.type.startsWith('image')" open-on-hover activator="parent">
        <v-sheet min-height="40">
          <v-img :src="item.path" width="150" />
        </v-sheet>
      </v-menu>
    </a>
  </template>
  <template v-else>
    <span
      class="text-primary me-2 text-decoration-underline"
      style="cursor: pointer;"
      @click="showResource()">
      {{ title }}
    </span>
  </template>
</template>