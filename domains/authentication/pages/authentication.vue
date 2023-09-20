<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'authentication',
  layout: 'bare',
});

useHead({
  title: 'Login',
});


/* authentication */

function onAuthenticated() {

  const next = route.query['next'];

  if (!next) {
    return router.push({
      name: 'general.home',
    });
  }

  if (next.startsWith('::')) {
    return router.push({
      name: next.slice(2),
    });
  }
  
  if(next.startsWith('http')) {
    return window.open(next);
  }

  router.push(next);

}


/* template */

import BackgroundImage from '../assets/images/background.webp';

</script>


<template>
  <div class="h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr]">

    <div class="grid items-center justify-center">

      <authentication-handler
        @authenticated="onAuthenticated()"
      />

    </div>

    <div class="hidden md:block">
      <img
        :src="BackgroundImage"
        class="h-screen w-full shadow-md border-r-1px border-r-black/30 object-cover"
      />
    </div>

  </div>
</template>