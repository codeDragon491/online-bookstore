<template>
  <div class="home">
    <basket :list="itemsInBasket" />
    <section v-if="!error" data-cy="items" class="items">
      <Item v-for="item in items" :key="item.id" :item="item">
        <template v-slot:button>
          <button data-cy="button" class="button" @click="addItemToBasket(item)">
            Add to basket
          </button>
        </template>
      </Item>
      <ItemSkeleton v-for="index in (10 - items.length)" :key="index" />
    </section>
    <section v-if="error && !items.length" data-cy="error" class="error">
      {{ error }}
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onBeforeMount, defineAsyncComponent, onUnmounted,
} from 'vue'

import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'HomeView',
  components: {
    Basket: defineAsyncComponent(() => import(/* webpackMode: "eager" */ '@/components/shared/Basket.vue')),
    Item: defineAsyncComponent(() => import('@/components/shared/Item.vue')),
    ItemSkeleton: defineAsyncComponent(() => import(/* webpackMode: "eager" */ '@/components/shared/ItemSkeleton.vue')),
  },
  setup() {
    const {
      items, error, getItems, addItemToBasket, itemsInBasket,
    } = useItems()

    onBeforeMount(async () => {
      await getItems()
    })
    onUnmounted(() => {
      items.value = []
      error.value = ''
    })
    return {
      items, error, addItemToBasket, itemsInBasket,
    }
  },
});
</script>
<style lang="scss" scoped>
@media  screen and (min-width:  2160px) {
  .home {
    max-width: 80%;
  }
}
</style>
