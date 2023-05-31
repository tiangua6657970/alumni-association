<script setup>
  import { ref } from 'vue'
  // import { navigateToPaymentResult } from '@/common/navigates'

  const amount = ref()
  const paymentMethod = ref('')

  function handleSubmit() {}
</script>
<template>
  <view class="donation aa-container">
    <u-field label-position="top" v-model="amount" label="捐款金额" placeholder="0000.00" />
    <aa-payment-method-list root-class="mt-20" @paymentMethodChange="paymentMethod = $event" />
    <u-button type="primary" @click="handleSubmit">支付</u-button>
  </view>
</template>

<style scoped lang="scss">
  .donation {
    .u-btn {
      margin: 100rpx 100rpx 0 100rpx;
    }
  }
</style>