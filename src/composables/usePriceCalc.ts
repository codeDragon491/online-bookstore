import { ref, Ref } from 'vue';
import { Book } from '@/composables/useItems'

const priceSum: Ref<null | number> = ref(null)
const onDiscount = ref(false)

const today = new Date()
const date = today.getDate()
const month = today.getMonth()
const discount = 20 / 100

const calculatePriceSum = (items: Book[]) => {
  const initialValue = 0
  priceSum.value = items
    .reduce((accumulator:number, item) => accumulator + (item.price * item.quantity!), initialValue)
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

const usePriceCalc = () => ({
  calculatePriceSum, totalAmount, totalAmountDiscount, onDiscount,
})

export default usePriceCalc