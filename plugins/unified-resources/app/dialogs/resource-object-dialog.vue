<script setup>

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
  resource: () => props.resource,
});

const { resourceUrlPart } = useResourceUrl({
  resource: () => props.resource,
});


/* object */

const object = ref({});
const objectClone = ref({});


const isCreating = computed(() =>
  !props.resourceId
);


onMounted(async () => {

  if (props.resourceId) {

    object.value = await retrieveResourceObject({
      resource: props.resource,
      resourceId: props.resourceId,
    });

    objectClone.value = JSON.parse(JSON.stringify(object.value));

  }

});


/* submission */

const cacher = useCacher();

async function submitObject() {

  if (JSON.stringify(object.value) === JSON.stringify(objectClone.value)) {
    return toastWarning({
      title: 'You have made no changes.',
    });
  }


  let method = 'post';
  let url = `/${resourceUrlPart.value}/`;
  let body = JSON.parse(JSON.stringify(object.value));

  if (!isCreating.value) {
    method = 'patch';
    url += object.value._id;
    delete body._id;
    delete body.createdAt;
    delete body.updatedAt;
  }


  const data = await ufetch(url, {
    method,
    body,
  });


  cacher.set(`resource.${props.resource}.${object.value._id}.object`, data);
  emit('resolve', data);

}

</script>


<template>
  <u-card
    icon="i-mdi-folder"
    :title="`${isCreating ? 'Create a' : 'Update the'} ${props.resource}`"
    text="Enter the information in the form below."
    class="w-5xl max-w-full">

    <u-form
      :target="object"
      :fields="fields"
      class="mt-3"
    />

    <div class="flex mt-4">

      <u-btn
        variant="soft"
        color="primary"
        :icon="isCreating ? 'i-mdi-plus' : 'i-mdi-pencil'"
        :label="`${isCreating ? 'Create a' : 'Update the'} ${props.resource}`"
        class="primary"
        :click-handler="submitObject"
      />

      <div class="grow" />

      <u-btn
        class="ghost"
        label="Cancel"
        @click="emit('resolve')"
      />

    </div>

  </u-card>
</template>