<script setup>

const language = useLanguage();


/* interface */

const props = defineProps({
  title: String,
  resource: String,
});

const emit = defineEmits([

]);


/* fields */

const { fields } = useResourceMetaFields({
  resource: () => props.resource,
});


/* object */

const { resourceUrlPart } = useResourceUrl({
  resource: () => props.resource,
});

const { data: object, refresh: refreshObject } = useUFetch(
  computed(() => `/${resourceUrlPart.value}/`),
  {
    query: {
      'filters': computed(() => `lang:eq:${language.value}`),
    },
  }
);


/* submission */

const submitting = ref(false);

async function submitSettings() {

  if (!object.value.lang) {
    object.value.lang = language.value;
  }

  await ufetch(`/${resourceUrlPart.value}/`, {
    loading: submitting,
    method: 'patch',
    body: object.value,
    query: {
      'filters': `lang:eq:${language.value}`,
    },
  });


  refreshObject();

  toastSuccess({
    title: 'Settings was saved.',
  });

}


/* template */

</script>


<template>
  <section>

    <div class="flex items-start justify-between">

      <span class="text-xl font-bold">
        {{ props.title }}
      </span>

      <u-btn
        color="primary"
        icon="i-bx-upload"
        label="Save Settings"
        :loading="submitting"
        @click="submitSettings()"
      />

    </div>

    <u-form
      v-if="object"
      :target="object"
      :fields="fields"
      class="mt-4"
    />

  </section>
</template>