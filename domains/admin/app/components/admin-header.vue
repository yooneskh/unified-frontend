<script setup>

const config = useAppConfig();
const token = useToken();
const user = useUser();


/* admin header links */

const { data: links } = await useUFetch('/admin/header/links');

</script>


<template>
  <general-header>
    <template #inside-bottom>
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
            <u-btn :label="link.label" class="outline neutral" append-icon="i-mdi-chevron-down">
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
    </template>
  </general-header>
</template>