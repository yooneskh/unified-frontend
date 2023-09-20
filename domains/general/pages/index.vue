<script setup>

const http = useHttp();

const router = useRouter();
const route = useRoute();


/* page */

definePageMeta({
  name: 'general.home',
});

useHead({
  title: 'Home',
});


/* template */

</script>


<template>
  <content-container class="h-[calc(100vh-64px)] flex flex-col gap-3 items-center justify-center">

    <div class="text-2xl">
      Welcome to the Unified Frontend!
    </div>

    <a href="https://github.com/yooneskh" target="_blank">
      <a-btn
        variant="light"
        color="primary"
        icon="i-bx-link">
        Made By Yooneskh
      </a-btn>
    </a>

  </content-container>
</template>