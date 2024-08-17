<script setup>

const route = useRoute();


/* admin header links */

const { data: links } = await useUFetch('/admin/header/links');

const activeItem = computed(() => {
  for (const link of links.value ?? []) {

    if (link.to && route.name === link.to.name && (!route.params?.resourceIdentifier || route.params.resourceIdentifier === link.to.params?.resourceIdentifier)) {
      return link;
    }

    if (link.children?.length > 0) {
      for (const child of link.children) {
        if (child.to && route.name === child.to.name && (!route.params?.resourceIdentifier || route.params.resourceIdentifier === child.to.params?.resourceIdentifier)) {
          return child;
        }
      }
    }

  }
});

const activeGroup = computed(() =>
  links.value?.find(it => it === activeItem.value || it.children?.includes(activeItem.value))
);

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
                class="outline"
                :class="{
                  'bg-neutral/15': link === activeGroup,
                }"
              />
            </nuxt-link>
          </template>

          <template v-else>
            <u-btn
              :label="link.label"
              append-icon="i-mdi-chevron-down"
              class="outline"
              :class="{
                'bg-neutral/15': link === activeGroup,
              }">
              <u-dropdown>
                <u-card class="p-1 space-y-1">
                  <nuxt-link v-for="child of link.children" :to="child.to" class="block">
                    <u-btn
                      :label="child.label"
                      class="ghost w-[192px] text-sm"
                      :class="{
                        'bg-neutral/15': child === activeItem,
                      }"
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