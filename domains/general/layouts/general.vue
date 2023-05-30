<script setup>

const router = useRouter();
const route = useRoute();


/* template */

</script>


<template>
  <v-layout>

    <general-header
      v-if="!$route.meta.hideHeader"
    />

    <v-main>
      <slot />
    </v-main>

  </v-layout>
</template>