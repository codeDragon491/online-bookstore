import { ref, Ref } from 'vue'

import axiosConfig from '@/helpers/axiosConfig'
import { Book, BookRef } from '@/models/book.model'

const error = ref('')
const loading = ref(false)
const items: Ref<Book[]> = ref([])
const itemsInBasket: Ref<BookRef[]> = ref([])

if (localStorage.getItem('itemsInBasket')) {
  itemsInBasket.value = JSON.parse(localStorage.getItem('itemsInBasket')!)
}

const getItems = async () => {
  items.value = []
  error.value = ''
  loading.value = true
  try {
    const { data } = await axiosConfig().get('/items')
    items.value = data
    loading.value = false
  } catch (err: any) {
    if (err.response && err.response.data) {
      error.value = err.response.data.message
    } else error.value = 'Something went wrong. Try again later'
    loading.value = false
  }
}
const getItem = async (id: number) => {
  items.value = []
  error.value = ''
  loading.value = true
  try {
    const { data } = await axiosConfig().get(`/items/${id}`)
    items.value.push(data)
    items.value = items.value.map((item: Book) => {
      const item2 = itemsInBasket.value.find((i2) => i2.id === item.id)
      return { ...item, ...item2 }
    })
    loading.value = false
  } catch (err: any) {
    if (err.response && err.response.data) {
      error.value = err.response.data.message
    } else error.value = 'Something went wrong. Try again later'
    loading.value = false
  }
}

// add item( id and quantity) to basket and save it to localstorage
// compare on item id and if already in the basket only increase quantity of that item
const addItemToBasket = (item: Book) => {
  if ((itemsInBasket.value.some((i) => i.id === item.id))) {
    const itemIndex = itemsInBasket.value.findIndex(((i) => i.id === item.id));
    itemsInBasket.value[itemIndex].quantity = itemsInBasket.value[itemIndex].quantity! + 1
    localStorage.setItem('itemsInBasket', JSON.stringify(itemsInBasket.value))
  } else {
    const newItem = { id: item.id, quantity: 1 }
    itemsInBasket.value.push(newItem)
    localStorage.setItem('itemsInBasket', JSON.stringify(itemsInBasket.value))
  }
}

const useItems = () => ({
  loading, items, itemsInBasket, error, getItems, getItem, addItemToBasket,
})

export default useItems
