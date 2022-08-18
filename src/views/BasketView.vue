<template>
  <div class="basket page">
     <section data-cy="items" class="items">
      <div data-cy="item" class="item-wrapper" v-for="item in items" :key="item.id">
        <img :src="item.image_url" :alt="items.title" />
        <div class="info-box">
          <h2 class="title">{{ item.title}}</h2>
          <p class="price">Price: <span>{{ item.price }} €</span></p>
          <p class="quantity">Quantity: <span> {{ item.quantity }}</span></p>
          <div class="button">
            <label for="item-select">
              <select v-model="item.quantity" name="item-select">
                <option v-for="option in options" :key="option.value" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </section>
    <section data-cy="error" class="error">
      {{ error }}
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onBeforeMount, onUnmounted, ref, onUpdated, Ref,
} from 'vue';

import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'BasketView',
  components: {
  },
  setup() {
    // only mock data for options
    const options = ref([{ value: 1, text: 'Change quantity' }, { value: 1, text: 1 }, { value: 2, text: 2 }, { value: 3, text: 3 }])
    const {
      loading, items, itemsInBasket, error, getItem,
    } = useItems()

    onBeforeMount(async () => {
      itemsInBasket.value.forEach(async (item) => {
        await getItem(item.id)
      })
    })
    onUnmounted(() => {
      items.value = []
      error.value = ''
    })

    return {
      items, error, options,
    }
  },
});
</script>
<style lang="scss" scoped>
.basket {
  max-width: 50%;
}
</style>
