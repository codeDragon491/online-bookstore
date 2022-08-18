<template>
  <div data-cy="item" class="item-wrapper">
    <div class="image skeleton" />
    <div class="info-box">
      <div class="title skeleton"></div>
      <div class="price skeleton"></div>
      <div class="stock skeleton"></div>
      <div class="btn skeleton"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemSkeleton',
})
</script>
<style lang="scss" scoped>
@keyframes load {
    from {
        left: -150px;
    }
    to {
        left: 100%;
    }
}
.skeleton {
    background: $clr-ntrl-min;
    box-shadow: 0 4px 10px 0 rgba($clr-base-drk, 0.15);
    position: relative;
    overflow: hidden;
}
.skeleton::before, .button-skeleton::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    bottom:0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent 0%, rgba($clr-primary, 0.25) 50%,
  transparent 100%);
    animation: load 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}
.image {
  width: 264px;
  height: 264px;
}
.title {
  width: 77px;
  height: 33px;
}
.price {
  width: 112px;
  height: 27px;
}
.stock {
  width: 71px;
  height: 21.5px;
}
.btn {
  margin-top: auto;
  width: 200px;
  height: 43.5px;
}
</style>
