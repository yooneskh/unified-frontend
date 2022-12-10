<script setup>

/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
});

const emit = defineEmits([]);


/* general */

const loading = ref(false);
const elExplorer = ref();


/* create new */

import { launchDialog } from '~~/services/dialogs/mod';
import ResourceObjectDialog from './object-dialog.vue';

async function handleCreateNew() {

  const result = await launchDialog({
    component: ResourceObjectDialog,
    props: {
      resource: props.resource,
    },
  });

  if (!result) {
    return;
  }


  elExplorer.value?.refreshItems();

}


/* template */

import ExplorerTable from './explorer-table.vue';

</script>


<template>
  <v-card :prepend-icon="props.icon" :title="props.title" :loading="loading">

    <template #append>
      <v-btn flat color="primary" prepend-icon="mdi-plus" @click="handleCreateNew()">
        Create New
      </v-btn>
    </template>

    <explorer-table
      ref="elExplorer"
      :resource="props.resource"
      @update:loading="loading = $event"
    />

  </v-card>
</template>