<script setup>

import { http, generalHttpHandle } from "~~/services/http/mod";
import { retrieveResourceObject } from "./composeables/use-resource-object";

const router = useRouter()
const route = useRoute()

/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
  resourceObject: Object,
});

const emit = defineEmits([]);


/* meta */

import { useResourceMetaFields } from './composeables/use-resource-meta-fields';

const { fields } = useResourceMetaFields({
  resource: props.resource,
});


/* object */

const object = ref({});
const objectClone = ref({});
const loading = ref(false);

onMounted(async () => {

  if (props.resourceObject) {
    object.value      = JSON.parse(JSON.stringify(props.resourceObject));
    objectClone.value = JSON.parse(JSON.stringify(props.resourceObject));
    return;
  }
  else if (props.resourceId) {

    loading.value = true;

    object.value = await retrieveResourceObject({
      resource: props.resource,
      resourceId: props.resourceId,
    });

    loading.value = false;

    objectClone.value = JSON.parse(JSON.stringify(object.value));

  }

});


/* template */

</script>


<template>
  <v-card
    prepend-icon="mdi-folder"
    :title="`Manage ${props.resource}`"
    :subtitle="props.resourceId || props.resourceObject ? ('Update Item') : ('Create Item')"
    width="768">

    <v-card-text class="pb-0">
      Please fill the form.
    </v-card-text>

    <v-card-text class="pt-0">
      <u-form
        class="px-0 pt-0"
        :target="object"
        :fields="fields"
      />
    </v-card-text>

  </v-card>
</template>