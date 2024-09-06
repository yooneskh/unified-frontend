<script setup>

const user = useUser();


/* interface */

const props = defineProps({

});

const emit = defineEmits([
  'resolve',
]);


/* media */

const { pending, data: mediaList, refresh } = useUFetch(`/media/`, {
  query: {
    owner: computed(() => user.value._id),
  },
});

const reversedMediaList = computed(() =>
  mediaList.value?.toReversed() ?? []
);

const allExtensions = computed(() =>
  [...new Set( mediaList.value?.map(it => it.extension) )]
);


const query = ref('');
const selectedExtension = ref(undefined);

const queriedMediaList = computed(() =>
  reversedMediaList.value.filter(it =>
    ([it.name, it.extension].join(' ').toLowerCase().includes(query.value.toLowerCase())) &&
    (!selectedExtension.value || (it.extension === selectedExtension.value))
  )
);


/* upload */

const elFile = ref();
const loading = ref(false);
const progress = ref(0);


async function handleFileSelected(file) {

  const payload = new FormData();
  payload.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', useAppConfig().http.apiUrl + '/media/upload', true);
  xhr.setRequestHeader('Authorization', useToken().value);

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      progress.value = (event.loaded / event.total) * 100;
    }
  };

  xhr.onload = () => {

    loading.value = false;

    toastSuccess({
      title: 'Media was uploaded successfully',
    });

    refresh();

  };

  xhr.onerror = () => {
  
    loading.value = false;

    toastDanger({
      title: 'Upload failed. Please try again.',
    });

  };

  loading.value = true;
  xhr.send(payload);

}

async function deleteFile(media) {
  launchButtonPickerDialog({
    title: 'Delete Media',
    text: 'Are you sure you want to delete this media?',
    startButtons: [
      {
        label: 'Delete Media',
        classes: 'danger',
        handler: async () => {

          await ufetch(`/media/${media._id}`, {
            loading,
            method: 'delete',
          });
        
          refresh();

        },
      },
    ],
    endButtons: [
      {
        label: 'No, Do not delete',
      },
    ],
  });
}

</script>


<template>
  <u-card
    icon="i-mdi-view-gallery-outline"
    title="Media Gallery"
    subtitle="Select media from gallery"
    class="w-5xl max-w-full">

    <template #append>

      <template v-if="loading">
        <span class="text-xs opacity-50 mt-2.5">
          %{{ progress?.toFixed(0) }}
        </span>
      </template>

      <u-btn
        icon="i-mdi-upload"
        label="Upload New Media"
        class="primary text-sm"
        :loading="loading || pending"
        @click="elFile.click()"
      />

      <input
        ref="elFile"
        :key="loading"
        type="file"
        class="hidden"
        @change="handleFileSelected($event?.target.files?.[0])"
      />

    </template>

    <div class="my-3 flex items-start gap-4">
      <div>
        <u-input
          placeholder="Search"
          v-model="query"
        />
      </div>
      <div>
        <u-select
          placeholder="Filter File Type"
          :items="[
            { title: 'None', value: '' },
            ...allExtensions.map(it => ({ title: it, value: it })),
          ]"
          v-model="selectedExtension"
        />
      </div>
    </div>

    <div v-if="pending && !(mediaList?.length > 0)" class="p-6 text-center">
      <u-spinner
        class="w-[24px]"
      />
    </div>
    <div v-else-if="!pending && mediaList.length === 0" class="text-sm text-center p-3">
      You have not uploaded any media yet.
    </div>

    <div class="grid grid-cols-5 gap-3 mt-3 max-h-[512px] overflow-y-auto -mx-3 px-3">
      <u-card v-for="media of queriedMediaList" :key="media._id" class="p-1 interactive border-none shadow-none group relative" @click="emit('resolve', media._id);">

        <img
          v-if="media.type?.startsWith('image')"
          :src="media.path"
          class="h-[128px] w-full object-contain bg-gray/10 p-2"
        />
        <div v-else class="h-[128px] w-full bg-gray/10 flex items-center justify-center">
          <u-icon
            name="i-mdi-file"
            class="text-6xl opacity-50"
          />
        </div>

        <p class="text-sm text-center mt-2 break-all">
          {{ media.name }}.{{ media.extension }}
        </p>
        <p class="text-xs text-center mt-1">
          {{ (media.size / 1024 / 1024).toFixed(2) }} MB
        </p>

        <div class="absolute top-[4px] right-[4px] opacity-0 group-hover:opacity-100 z-[1]">
          <u-btn
            class="soft danger text-xs"
            icon="i-mdi-close"
            @click.stop="deleteFile(media)"
          />
        </div>

      </u-card>
    </div>

  </u-card>
</template>