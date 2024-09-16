<script setup>

const config = useAppConfig();
const user = useUser();


/* logout */

async function logoutUser() {
  await authenticationLogoutUser(useToken(), useUser());
  navigateTo({ name: 'general.home' });
}

</script>


<template>
  <header class="border-b-1">

    <content-container class="flex items-center py-2">

      <nuxt-link class="text-lg" :to="{ name: 'general.home' }">
        {{ config.brand.title }}
      </nuxt-link>

      <div class="grow" />

      <template v-if="user">
        <u-btn
          icon="i-mdi-account-outline"
          class="ghost">
          <u-dropdown>
            <u-card class="p-1 flex flex-col gap-1 w-xs">
              <p class="text-sm text-center mb-1">
                {{ user.email }}
              </p>
              <hr />
              <nuxt-link v-if="user?.permissions?.some(it => it.startsWith('admin'))" :to="{ name: 'admin.dashboard' }">
                <u-btn
                  icon="i-mdi-view-dashboard"
                  label="Admin dashboard"
                  class="ghost text-sm w-full"
                />
              </nuxt-link>
              <u-btn
                icon="i-mdi-logout"
                label="Logout"
                class="soft danger text-sm"
                :click-handler="logoutUser"
              />
            </u-card>
          </u-dropdown>
        </u-btn>
      </template>
      <template v-else>
        <nuxt-link :to="{ name: 'authentication' }">
          <u-btn
            label="Login"
            class="soft text-sm"
          />
        </nuxt-link>
      </template>

    </content-container>

    <slot name="inside-bottom" />

  </header>
</template>