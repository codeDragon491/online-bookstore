<template>
  <h3 class="total-amount-discount" v-if="onDiscount">Total amount:
    <span>{{ getTotalAmountDiscount() }} €</span>
    <span>{{ getTotalAmount() }} €</span>
    <span>-20%</span>
  </h3>
  <h3 class="total-amount" v-else>Total amount:
    <span>{{ getTotalAmount() }} €</span>
  </h3>
</template>

<script lang="ts">
import {
  defineComponent, PropType, onMounted, watch,
} from 'vue'
import { Book } from '@/models/book.model'
import usePriceCalc from '@/composables/usePriceCalc'

export default defineComponent({
  name: 'getTotalAmount',
  props: {
    items: {
      type: Array as PropType<Array<Book>>,
      required: true,
    },
  },
  setup(props) {
    const {
      calculatePriceSum, getTotalAmount, getTotalAmountDiscount, onDiscount,
    } = usePriceCalc()

    onMounted(() => {
      calculatePriceSum(props.items)
      getTotalAmountDiscount()
    })

    watch(() => props.items, () => {
      calculatePriceSum(props.items)
      getTotalAmountDiscount()
    }, { deep: true })

    return { getTotalAmount, getTotalAmountDiscount, onDiscount }
  },
})
</script>

<style lang="scss">
.total {
  border-top: 1px solid $clr-ntrl-max;
  margin: 3em 0;
  padding: 1.5em 0;
  text-align: center;
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
