<template>
  <div class="basket-wrapper" @click="goToBasket()">
    <img alt="shopping-basket" src="@/assets/icons/basket.svg">
        <div :class="`${itemCount ? 'visible' : 'hidden'} dot-marker`">
            <p class="number">
              {{ itemCount }}
            </p>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, PropType, defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import { BookRef } from '@/composables/useItems';

export default defineComponent({
  name: 'BasketComponent',
  props: {
    list: {
      type: Array as PropType<Array<BookRef>>,
      default: () => (localStorage.getItem('itemsInBasket') ? JSON.parse(localStorage.getItem('itemsInBasket')!) : []),
    },
  },
  setup(props) {
    const router = useRouter()
    const goToBasket = () => {
      router.push({ name: 'basket' })
    }
    const itemCount = computed(() => {
      if (props.list) {
        const initialValue = 0
        return props.list.reduce((accumulator, item) => accumulator + item.quantity, initialValue)
      } return 0
    })
    return {
      goToBasket, itemCount,
    }
  },
})
</script>
<style lang="scss" scoped>
.basket-wrapper {
  cursor: pointer;
  position: absolute;
  text-align: right;
  right: 1rem;
  top: 1.5rem;
}
.dot-marker {
  text-align: center;
  background-color: $clr-primary-drk;
  color: $clr-ntrl-min;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
  position: absolute;
  left: 100%;
  top: 10%;
  transform: translate(-100%, -10%);
  margin: 0;
}
.dot-marker .number {
  margin: 0;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -60%);
}
@media screen and (min-width: 1440px) {
  .basket-wrapper {
    right: 5rem;
    top: 1.5rem;
  }
}
</style>
