<script setup>

const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.resources',
  layout: 'admin',
  middleware: 'is-authenticated-admin',
});


/* resource */

import { singular } from 'pluralize';
import startCase from 'lodash/startCase';

const resourceIdentifier = computed(() =>
  route.params.resourceIdentifier
);

const resourceModel = computed(() =>
  startCase(singular(resourceIdentifier.value)).replaceAll(' ', '')
);


/* seo */

useHead({
  title: resourceModel,
});

</script>


<template>
  <content-container>
    <resource-manager-card
      :resource="resourceModel"
      class="my-6"
    />
  </content-container>
</template>