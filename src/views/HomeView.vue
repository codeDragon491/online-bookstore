<template>
  <div class="home page">
    <basket :list="itemsInBasket" />
    <section data-cy="items" class="items">
      <div data-cy="item" class="item-wrapper" v-for="item in items" :key="item.id">
        <img :src="item.image_url" :alt="items.title" />
        <div class="info-box">
          <h2 class="title">{{ item.title}}</h2>
          <p class="price">Price: <span>{{ item.price }} €</span></p>
          <p class="stock">In stock: <span>{{ item.stock_quantity}}</span></p>
          <button data-cy="button" class="button" @click="addItemToBasket(item)">
            Add to basket
          </button>
        </div>
      </div>
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
