<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  setup() {
    const {
      loading, items, error, getItems,
    } = useItems()
    onBeforeMount(async () => {
      await getItems()
    })
  },
});
</script>
