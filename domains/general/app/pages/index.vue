<script setup>

/* page */

definePageMeta({
  name: 'general.home',
});

useHead({
  title: '',
});

</script>


<template>
  <main>
    <content-container class=":uno: flex flex-col items-center justify-center gap-3 py-50">

      <p>
        Hello to Unified Components!
      </p>
  
      <nuxt-link to="https://github.com/yooneskh" target="_blank">
        <u-btn
          icon="i-mdi-github"
          label="Go To Github"
          class="soft primary text-sm"
        />
      </nuxt-link>

    </content-container>
  </main>
</template>
