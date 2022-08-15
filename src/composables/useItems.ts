import { ref, Ref } from 'vue';

import axiosConfig from '@/helpers/axiosConfig';

export interface Book {
  discountSet: string
  id: number
  imageUrl: string
  price: number
  stockQuantity: number
  title: string
}

const error = ref('')
const loading = ref(false)
const items: Ref<Book[]> = ref([])

const getItems = async () => {
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

const useItems = () => ({
  loading, items, error, getItems,
})

export default useItems
