<template>
  <div data-cy="item" class="item-wrapper">
    <img :src="itemRef.image_url" :alt="itemRef.title" />
    <div class="info-box">
      <h2 class="title">{{ itemRef.title}}</h2>
      <p class="price">Price: <span>{{ itemRef.price }} €</span></p>
      <p class="stock">In stock: <span>{{ itemRef.stock_quantity}}</span></p>
      <p class="quantity">Quantity: <span> {{ itemRef.quantity }}</span></p>
      <slot name="button"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent, PropType, toRef, onUpdated,
} from 'vue'
import { Book } from '@/composables/useItems'

export default defineComponent({
  name: 'ItemComponent',
  props: {
    item: {
      type: Object as PropType<Book>,
      required: true,
    },
  },
  emits: ['update:item'],
  setup(props, context) {
    const itemRef = toRef(props, 'item')

    onUpdated(() => {
      context.emit('update:item', itemRef.value)
    })
    return { itemRef }
  },
})
</script>
