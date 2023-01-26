<script setup>

const router = useRouter();
const route = useRoute();


/* interface */

const props = defineProps({
  gate: {},
  method: String,
  url: String,
  body: {},
  queries: Object,
  parameters: Object,
});

const emit = defineEmits([]);


/* request */

const { loading, error, status, data, headers, refresh } = useNetwork({
  gate: props.gate,
  method: computed(() => props.method),
  url: computed(() => props.url),
  body: computed(() => props.body),
  queries: computed(() => props.queries),
});


defineExpose({
  refresh,
});


/* template */

</script>


<template>

  <template v-if="loading">
    <slot name="loading">
      <div class="pa-12 text-center">
        <v-progress-circular
          indeterminate
          size="24"
          color="primary"
        />
      </div>
    </slot>
  </template>

  <template v-else-if="error">
    <slot
      name="error"
      :error="error"
      :status="status"
      :data="data"
      :headers="headers"
      :refresh="refresh"
    />
  </template>

  <template v-else>
    <slot
      :status="status"
      :data="data"
      :headers="headers"
      :refresh="refresh"
    />
  </template>

</template>