<script setup>

const http = useHttp();

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

const { fields } = useResourceMetaFields({
  resource: computed(() => props.resource),
});

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});


/* object */

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

const cacher = useCacher();

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
    cacher.set(`resource.${props.resource}.${object.value._id}.object`, data);
  }
  else {
    cacher.delete(`resource.${props.resource}.${object.value._id}.object`);
  }


  emit('resolve', data);

}


/* template */

import startCase from 'lodash/startCase';

</script>


<template>
  <a-card
    icon="mdi-folder"
    :title="`${(isCreating) ? ('Create') : ('Update')} ${startCase(props.resource)}`"
    :loading="submitting"
    class="w-512px">

    <div class="a-card-body max-h-70vh overflow-y-auto">

      <p class="text-body-1">
        Please fill the form.
      </p>

      <u-form
        :target="object"
        :fields="fields"
        class="mt-4"
      />

    </div>

    <div v-if="isValidationOk || validationMessages?.length > 0">
      <div
        class="text-white py-1 px-2"
        :class="[isValidationOk ? 'bg-success' : 'bg-danger']">
  
        <template v-if="isValidationOk">
          <div class="py-2 px-4">
            Everything is OK!
          </div>
        </template>
  
        <template v-else>
          <a-list
            class="ma-0"
            :items="validationMessages.map(it => it.error)"
          />
        </template>
  
      </div>
    </div>

    <div class="flex pa-2">

      <a-btn
        variant="light"
        color="primary"
        class="px-6"
        :icon="(isCreating) ? ('i-bx-plus') : ('i-bx-pencil')"
        :loading="validationLoading || submitting"
        :disabled="!isValidationOk"
        @click="submitObject()">
        {{ (isCreating) ? ('Create') : ('Update') }} {{ startCase(props.resource) }}
      </a-btn>

      <div class="grow" />

      <a-btn
        variant="light"
        class="px-6"
        :disabled="submitting"
        @click="emit('resolve')">
        Cancel
      </a-btn>

    </div>

  </a-card>
</template>