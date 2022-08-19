<template>
  <h3 class="total-amount-discount" v-if="onDiscount">Total amount:
    <span>{{ totalAmountDiscount() }} €</span>
    <span>{{ totalAmount() }} €</span>
    <span>-20%</span>
  </h3>
  <h3 class="total-amount" v-else>Total amount:
    <span>{{ totalAmount() }} €</span>
  </h3>
</template>

<script lang="ts">
import {
  defineComponent, PropType, onUpdated, onMounted,
} from 'vue'
import { Book } from '@/composables/useItems'
import usePriceCalc from '@/composables/usePriceCalc'

export default defineComponent({
  name: 'TotalAmount',
  props: {
    items: {
      type: Array as PropType<Array<Book>>,
      required: true,
    },
  },
  setup(props) {
    const {
      calculatePriceSum, totalAmount, totalAmountDiscount, onDiscount,
    } = usePriceCalc()

    onUpdated(() => {
      calculatePriceSum(props.items)
      totalAmountDiscount()
    })
    onMounted(() => {
      calculatePriceSum(props.items)
    })

    return { totalAmount, totalAmountDiscount, onDiscount }
  },
})
</script>

<style lang="scss">
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
