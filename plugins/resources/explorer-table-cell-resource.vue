<script setup>

/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
});

const emit = defineEmits([]);


/* resource */

import { useResourceUrl } from './composeables/use-resource-url';

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});


import { useNetwork } from './composeables/use-network';

const { loading, data: item, error } = useNetwork({
  method: 'get',
  url: computed(() => `/${resourceUrlPart.value}/${props.resourceId}`),
});


/* title */

import { useResourceTitle } from './composeables/use-resource-title';

const { title } = useResourceTitle({
  resource: computed(() => props.resource),
  resourceObject: item,
});


/* template */

</script>


<template>
  <template v-if="props.resource !== 'Media'">
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
    {{ title }}
  </template>
</template>