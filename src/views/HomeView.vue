<template>
  <div class="home page">
    <basket :list="itemsInBasket" />
    <section data-cy="items" class="items">
      <Item v-for="item in items" :key="item.id" :item="item">
        <template v-slot:button>
          <button data-cy="button" class="button" @click="addItemToBasket(item)">
            Add to basket
          </button>
        </template>
      </Item>
      <ItemSkeleton v-for="index in (10 - items.length)" :key="index" />
    </section>
    <section data-cy="error" class="error">
      {{ error }}
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onBeforeMount, defineAsyncComponent, onUnmounted,
} from 'vue';

import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'HomeView',
  components: {
    Basket: defineAsyncComponent(() => import(/* webpackMode: "eager" */ '@/components/Basket.vue')),
    Item: defineAsyncComponent(() => import('@/components/Item.vue')),
    ItemSkeleton: defineAsyncComponent(() => import('@/components/ItemSkeleton.vue')),
  },
  setup() {
    const {
      loading, items, error, getItems, addItemToBasket, itemsInBasket,
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
