<script setup>

const config = useAppConfig();
const token = useToken();
const user = useUser();

</script>


<template>
  <header class="border-b-1">
    <content-container class="flex items-center py-2">

      <nuxt-link class="text-lg" :to="{ name: 'general.home' }">
        {{ config.brand.title }}
      </nuxt-link>

      <div class="grow" />

      <template v-if="token">
        <nuxt-link :to="{ name: user?.permissions?.some(it => it.startsWith('admin')) ? 'admin.dashboard' : 'general.home' }">
          <u-btn
            icon="i-mdi-account-outline"
            class="ghost neutral"
          />
        </nuxt-link>
      </template>
      <template v-else>
        <nuxt-link :to="{ name: 'authentication' }">
          <u-btn
            label="Login"
            class="soft neutral text-sm"
          />
        </nuxt-link>
      </template>

    </content-container>
  </header>
</template>