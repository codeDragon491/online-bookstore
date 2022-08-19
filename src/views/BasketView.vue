<template>
  <div class="basket page">
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
        <h3 class="total-amount-discount" v-if="onDiscount">Total amount:
          <span>{{ totalAmountDiscount() }} €</span>
          <span>{{ totalAmount() }} €</span>
          <span>-20%</span>
        </h3>
        <h3 class="total-amount" v-else>Total amount:
          <span>{{ totalAmount() }} €</span>
        </h3>
      </section>
      <section v-if="error && !items.length" data-cy="error" class="error">
        {{ error }}
      </section>
    </div>
>>>>>>> fc13818 (Cleanup and improve code quality)
</template>

<script lang="ts">
import {
  defineComponent, defineAsyncComponent, onBeforeMount, onUnmounted, ref, onUpdated, Ref,
} from 'vue';

import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'BasketView',
  components: {
    Item: defineAsyncComponent(() => import('@/components/Item.vue')),
    ItemSkeleton: defineAsyncComponent(() => import('@/components/ItemSkeleton.vue')),
  },
  setup() {
    // mock data for options
    const options = ref([{ value: 1, text: 'Change quantity' }, { value: 1, text: 1 }, { value: 2, text: 2 }, { value: 3, text: 3 }])
    const onDiscount = ref(false)
    const priceSum: Ref<null | number> = ref(null)

    const {
      items, itemsInBasket, error, getItem,
    } = useItems()

    const today = new Date()
    const date = today.getDate()
    const month = today.getMonth()
    const discount = 20 / 100

    const calculatePriceSum = () => {
      const initialValue = 0
      return items.value
        .reduce((accumulator, item) => accumulator + (item.price * item.quantity!), initialValue)
    }

    const totalAmountDiscount = () => {
      if (priceSum.value) {
        if (date === 1 && month === 7) {
          onDiscount.value = true
          const priceSumDiscount = priceSum.value! - (priceSum.value! * discount)
          return priceSumDiscount.toFixed(2)
        } return priceSum.value!.toFixed(2)
      }
    }

    const totalAmount = () => {
      if (priceSum.value) {
        return priceSum.value!.toFixed(2)
      }
    }

    onBeforeMount(async () => {
      itemsInBasket.value.forEach(async (item) => {
        await getItem(item.id)
      })
    })
    onUnmounted(() => {
      items.value = []
      error.value = ''
    })

    onUpdated(() => {
      priceSum.value = calculatePriceSum()
      totalAmountDiscount()
    })

    return {
      items, error, options, totalAmount, totalAmountDiscount, onDiscount, itemsInBasket,
    }
  },
});
</script>
<style lang="scss" scoped>
.basket {
  max-width: 50%;
}
.total {
  border-top: 1px solid $clr-ntrl-max;
  margin: 3em 0;
  padding: 1.5em 0;
  display: flex;
  justify-content: center;
}
.total-amount-discount {
  span:nth-child(2) {
    text-decoration: line-through;
    margin: 0 1rem;
    color: rgba($clr-ntrl-max, 0.3)
  }
  span:nth-child(3) {
    color: $clr-error;
  }
}
</style>
