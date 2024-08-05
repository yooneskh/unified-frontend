<script setup>

/* page */

definePageMeta({
  name: 'general.home',
});

useHead({
  title: 'Home',
});

</script>


<template>
  <main class=":uno: flex flex-col items-center justify-center gap-3 h-screen">

    <p>
      Hello to Unified Components!
    </p>

    <nuxt-link to="https://github.com/yooneskh/unified-components" target="_blank">
      <u-btn
        icon="i-mdi-github"
        label="Go To Github"
        class="soft primary text-sm"
      />
    </nuxt-link>

  </main>
</template>
