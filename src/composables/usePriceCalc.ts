import { ref, Ref } from 'vue'
import { Book } from '@/models/book.model'

const priceSum: Ref<null | number> = ref(null)
const onDiscount = ref(false)

const today = new Date()
const date = today.getDate()
const month = today.getMonth()
const discount = 20 / 100

// calculate total price based on item price and quantity
const calculatePriceSum = (items: Book[]) => {
  const initialValue = 0
  priceSum.value = items
    .reduce((accumulator:number, item) => accumulator + (item.price * item.quantity!), initialValue)
}

// return total amount with discount sunsctraction if date is the 1st of August
// eslint-disable-next-line
const getTotalAmountDiscount = () => {
  if (priceSum.value) {
    if (date === 1 && month === 7) {
      onDiscount.value = true
      const priceSumDiscount = priceSum.value! - (priceSum.value! * discount)
      return priceSumDiscount.toFixed(2)
    }
  }
}

// return total amount
// eslint-disable-next-line
const getTotalAmount = () => {
  if (priceSum.value) {
    return priceSum.value!.toFixed(2)
  }
}

const usePriceCalc = () => ({
  calculatePriceSum, getTotalAmount, getTotalAmountDiscount, onDiscount,
})

export default usePriceCalc
