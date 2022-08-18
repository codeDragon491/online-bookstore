<template>
  <div class="basket page">
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onBeforeMount, onUnmounted, ref, onUpdated, Ref,
} from 'vue';

import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'BasketView',
  components: {
  },
  setup() {
    const {
      loading, items, itemsInBasket, error, getItem,
    } = useItems()

    onBeforeMount(async () => {
      itemsInBasket.value.forEach(async (item) => {
        await getItem(item.id)
      })
    })
    onUnmounted(() => {
      items.value = []
      error.value = ''
    })

    return {
      items, error,
    }
  },
});
</script>
<style lang="scss" scoped>
.basket {
  max-width: 50%;
}
</style>
