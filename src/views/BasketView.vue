<template>
  <div class="basket">
      <basket :list="itemsInBasket" />
      <section v-if="!error" data-cy="items" class="items">
        <Item v-for="(item, index) in items" :key="item.id" v-model:item="items[index]">
            <template v-slot:button>
              <div class="button">
                <label for="item-select">
                  <select v-model="item.quantity" name="item-select">
                    <option v-for="option in options" :key="option.value" :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </label>
            </div>
            </template>
          </Item>
          <ItemSkeleton v-for="index in (itemsInBasket.length - items.length)" :key="index" />
      </section>
      <section v-if="!error && items.length" class="total">
        <total-amount :items="items"/>
      </section>
      <section v-if="error && !items.length" data-cy="error" class="error">
        {{ error }}
      </section>
    </div>
</template>

<script lang="ts">
import {
  defineComponent, defineAsyncComponent, onBeforeMount, onUnmounted, ref,
} from 'vue'

import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'BasketView',
  components: {
    Basket: defineAsyncComponent(() => import(/* webpackMode: "eager" */ '@/components/shared/Basket.vue')),
    Item: defineAsyncComponent(() => import(/* webpackChunkName: "item" */ '@/components/shared/Item.vue')),
    ItemSkeleton: defineAsyncComponent(() => import(/* webpackMode: "eager" */ '@/components/shared/ItemSkeleton.vue')),
    TotalAmount: defineAsyncComponent(() => import(/* webpackChunkName: "totalAmount" */'@/components/basket/TotalAmount.vue')),
  },
  setup() {
    // mock data for options
    const options = ref([{ value: 1, text: 'Change quantity' }, { value: 1, text: 1 }, { value: 2, text: 2 }, { value: 3, text: 3 }])

    const {
      items, itemsInBasket, error, getItem,
    } = useItems()

    onBeforeMount(async () => {
      // get each item based on the number of items in the basket
      itemsInBasket.value.forEach(async (item) => {
        await getItem(item.id)
      })
    })
    onUnmounted(() => {
      items.value = []
      error.value = ''
    })
    return {
      items, error, options, itemsInBasket,
    }
  },
});
</script>
<style lang="scss" scoped>
.basket {
  display: inline-block;
}
</style>
