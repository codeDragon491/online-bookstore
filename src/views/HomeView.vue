<template>
  <div class="home">
    <section class="items">
      <div class="item-wrapper" v-for="item in items" :key="item.id">
        <img :src="item.image_url" :alt="items.title" />
        <div class="info-box">
          <h2 class="title">{{ item.title}}</h2>
          <p class="price">Price: <span>{{ item.price }} €</span></p>
          <p class="stock">In stock: <span>{{ item.stock_quantity}}</span></p>
          <button class="button">Add to basket</button>
        </div>
      </div>
    </section>
    <section class="error">
      {{ error }}
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import useItems from '@/composables/useItems'

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  setup() {
    const {
      loading, items, error, getItems,
    } = useItems()
    onBeforeMount(async () => {
      await getItems()
    })
    return {
      items, error,
    }
  },
});
</script>
<style lang="scss" scoped>
.home {
  margin: 0 auto;
}
.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, min(calc(200px + (2 * 2rem))));
  grid-gap: 3rem;
  justify-content: center;
}
.item-wrapper {
  text-align: center;
  img {
    padding: 2rem;
    box-shadow: rgba($clr-ntrl-min, 0.2) 0px 0px 0px 1px inset,
      rgba($clr-base-drk, 0.9) 0px 0px 0px 1px;
  }
  .info-box {
    margin: 1rem 0;
    .price {
      margin: 1rem 0;
      span {
        font-size: 1.25rem;
      }
    }
    .stock {
      margin-bottom: 1rem;
    }
    .button {
      margin-top: auto;
    }
  }
}
@media (min-width: 600px) {
  .items {
    grid-template-columns: repeat(auto-fill, min(calc(400px + (2 * 2rem)) + 2rem));
  }
  .item-wrapper {
    display: flex;
    text-align: left;
    .info-box {
      display: flex;
      flex-direction: column;
      margin: 1.5rem 0 2rem 2rem;
    }
    .button {
      width: 200px;
    }
  }
}
</style>
