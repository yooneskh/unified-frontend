<script setup>

const { http, generalHttpHandle } = useHttp();

const router = useRouter()
const route = useRoute()

/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
});

const emit = defineEmits([
  'resolve',
]);


/* resource */

import { useResourceMetaFields } from './composeables/use-resource-meta-fields';

const { fields } = useResourceMetaFields({
  resource: computed(() => props.resource),
});


import { useResourceUrl } from "./composeables/use-resource-url";

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});


/* object */

import { retrieveResourceObject } from './composeables/use-resource-object';

const object = ref({});
const objectClone = ref({});
const loading = ref(false);


const isCreating = computed(() =>
  !props.resourceId
);


onMounted(async () => {

  if (props.resourceId) {

    loading.value = true;
    object.value = await retrieveResourceObject({
      resource: props.resource,
      resourceId: props.resourceId,
    });
    loading.value = false;

    objectClone.value = JSON.parse(JSON.stringify(object.value));

  }

});


/* validation */

import { useDebouncedClone } from './composeables/use-debounced-clone';


const { target: debouncedObject } = useDebouncedClone({
  source: object,
  timeout: 1000,
  deep: true,
});


const { status: validationStatus, data: validationData, loading: validationLoading } = useNetwork({
  gate: computed(() =>
    isCreating.value || debouncedObject.value._id
  ),
  method: 'post',
  url: computed(() =>
    `/${resourceUrlPart.value}/validate`
  ),
  body: debouncedObject,
});


const isValidationOk = computed(() =>
  validationStatus.value === 200
);

const validationMessages = computed(() =>
  validationData.value?.validations
);


/* submission */

import { cache } from "~~/services/cache/mod";

const submitting = ref(false);

async function submitObject() {

  if (JSON.stringify(object.value) === JSON.stringify(objectClone.value)) {
    alert('You haven\'t made any changes.');
    return;
  }


  let method = 'post';
  let url = `/${resourceUrlPart.value}/`;

  if (!isCreating.value) {
    method = 'post';
    url += object.value._id + '/update';
  }


  submitting.value = true;

  const { status, data } = await http.request({
    method,
    url,
    body: object.value,
  });

  submitting.value = false;

  if (generalHttpHandle(status, data)) {
    return;
  }


  if (isCreating.value) {
    cache.set(`resource.${props.resource}.${object.value._id}.object`, data);
  }
  else {
    cache.delete(`resource.${props.resource}.${object.value._id}.object`);
  }


  emit('resolve', data);

}


/* template */

import startCase from 'lodash/startCase';

</script>


<template>
  <v-card
    prepend-icon="mdi-folder"
    :title="`${(isCreating) ? ('Create') : ('Update')} ${startCase(props.resource)}`"
    :loading="submitting"
    width="768">

    <v-card-text class="pb-0">
      Please fill the form.
    </v-card-text>

    <v-card-text class="pt-0">
      <u-form
        :target="object"
        :fields="fields"
      />
    </v-card-text>

    <v-alert
      v-if="isValidationOk || validationMessages?.length > 0"
      class="mx-5 pa-3 mb-3"
      :class="{
        'bg-error': !isValidationOk,
        'bg-success': isValidationOk,
      }"
      style="overflow: unset;">

      <template v-if="isValidationOk">
        Everything is OK!
      </template>

      <template v-else>
        <v-list class="bg-transparent py-0" density="compact">
          <v-list-item
            v-for="message of validationMessages" :key="message.error"
            class="px-2"
            :title="message.error"
          />
        </v-list>
      </template>

    </v-alert>

    <v-card-actions>

      <v-btn
        color="primary"
        variant="tonal"
        class="px-6"
        size="large"
        :prepend-icon="(isCreating) ? ('mdi-plus') : ('mdi-pen')"
        :loading="validationLoading || submitting"
        :disabled="!isValidationOk"
        @click="submitObject()">
        {{ (isCreating) ? ('Create') : ('Update') }} {{ startCase(props.resource) }}
      </v-btn>

      <v-spacer />

      <v-btn variant="tonal" size="large" class="px-6" :disabled="submitting" @click="emit('resolve')">
        Cancel
      </v-btn>

    </v-card-actions>

  </v-card>
</template>