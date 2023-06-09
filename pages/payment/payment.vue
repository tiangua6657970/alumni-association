<script setup>
  import useShoppingCart from '@/stores/shopping-cart'
  import { ref } from 'vue'
  import { navigateToPaymentResult } from '@/common/navigates'

  defineProps({ orderId: [Number, String] })
  const shoppingCart = useShoppingCart()
  const paymentMethod = ref('')
  function handlePayment() {
    navigateToPaymentResult()
  }
</script>
<template>
  <view class="payment">
    <view class="aa-block total-price">
      <!-- TODO: 获取订单后赋值 -->
      <aa-total-price :show-total-text="false" />
    </view>
    <aa-payment-method-list root-class="mt-20" @paymentMethodChange="paymentMethod = $event" />
    <aa-fixed-bottom-primary-btn @click="handlePayment">支付</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .payment {
  }

  .total-price {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80rpx 0;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>