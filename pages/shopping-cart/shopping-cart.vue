<script setup>
  import useShoppingCart from '@/stores/shopping-cart'
  import { navigateToConfirmOrder } from '@/common/navigates'

  const shoppingCart = useShoppingCart()

  function handleRemove(item) {
    uni.showModal({
      title: '移除',
      content: '确定从购物车中移除这个商品？',
      success: result => {
        if (result.confirm) {
          shoppingCart.remove(item)
        }
      }
    })
  }
</script>
<template>
  <view class="shopping-cart aa-container">
    <aa-shopping-cart-product-list :list="shoppingCart.shoppingCartStore" @remove="handleRemove" />
    <view class="aa-fixed-bottom" v-if="shoppingCart.shoppingCartStore.length">
      <u-checkbox :size="30" shape="circle" v-model="shoppingCart.allSelected">全选</u-checkbox>
      <aa-total-price
        class="aa-flex-1"
        :start-val="shoppingCart.oldTotalPrice"
        :end-val="shoppingCart.totalPrice"
      />
      <u-button class="aa-flex-1" type="primary" @click="navigateToConfirmOrder">去下单</u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .shopping-cart {
  }

  .aa-font-price {
    margin-left: 30rpx;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>