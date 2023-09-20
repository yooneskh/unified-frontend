<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* interface */

const props = defineProps({
  title: String,
  resource: String,
});

const emit = defineEmits([

]);


/* fields */

const { fields } = useResourceMetaFields({
  resource: computed(() => props.resource),
});


/* object */

const { resourceUrlPart } = useResourceUrl({
  resource: computed(() => props.resource),
});

const { data: object, refresh: refreshObject } = useNetwork({
  url: computed(() => `/${resourceUrlPart.value}/`),
});


/* submission */

const submitting = ref(false);

async function submitSettings() {

  submitting.value = true;
  const { status, data } = await http.request({
    method: 'patch',
    url: `/${resourceUrlPart.value}/`,
    body: object.value,
  });
  submitting.value = false;
  
  if (generalHttpHandle(status, data)) {
    return;
  }


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

      <a-btn
        color="primary"
        icon="i-bx-upload"
        class="text-sm"
        :loading="submitting"
        @click="submitSettings()">
        Save Settings
      </a-btn>

    </div>

    <u-form
      v-if="object"
      :target="object"
      :fields="fields"
      class="mt-4"
    />

  </section>
</template>