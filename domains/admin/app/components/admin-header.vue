<script setup>

const config = useAppConfig();
const token = useToken();
const user = useUser();


/* admin header links */

const { data: links } = await useUFetch('/admin/header/links');

</script>


<template>
  <header class="border-b-1">

    <content-container class="flex items-center py-2">

      <nuxt-link class="text-lg" :to="{ name: 'general.home' }">
        {{ config.brand.title }} Admin
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

    <content-container class="flex items-center pb-2 flex-wrap gap-2">
      <template v-for="link of links">
        <template v-if="!(link.children?.length > 0)">
          <nuxt-link :to="link.to">
            <u-btn
              :label="link.label"
              class="outline neutral"
            />
          </nuxt-link>
        </template>
        <template v-else>
          <u-btn :label="link.label" class="outline neutral">
            <u-dropdown>
              <u-card class="fill surface flex flex-col gap-1 p-1">
                <nuxt-link v-for="child of link.children" :to="child.to">
                  <u-btn
                    :label="child.label"
                    class="ghost neutral w-[192px] text-sm"
                  />
                </nuxt-link>
              </u-card>
            </u-dropdown>
          </u-btn>
        </template>
      </template>
    </content-container>

  </header>
</template>