<script setup>

const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.resources',
  layout: 'admin',
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
  title: resourceIdentifier,
});

</script>


<template>
  <content-container>
    <pre class="my-12">{{ { resourceIdentifier, resourceModel } }}</pre>
  </content-container>
</template>