<script setup>
  import { navigateToMyOrdersDetail, switchTabToShop } from '@/common/navigates'
</script>
<template>
  <view class="payment-result">
    <view class="payment-result-messages">
      <view class="payment-result-message-success">订单支付成功</view>
      <view class="payment-result-message-desc aa-font-desc">您可以在我的订单中查询订单详情或跟踪物流</view>
    </view>
    <view class="payment-result-action">
      <u-button class="btn" type="primary" @click="navigateToMyOrdersDetail">查看订单</u-button>
      <u-button class="btn" type="default" @click="switchTabToShop">返回商城首页</u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .payment-result {
    .payment-result-messages,
    .payment-result-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 100rpx 100rpx 0 100rpx;
    }
    .payment-result-message-success {
      font-size: 36rpx;
      font-weight: 500;
      color: #1b80c4;
    }
    .payment-result-message-desc {
      margin-top: 10rpx;
    }

    .payment-result-action {
      .btn {
        width: 100%;
        margin-bottom: 60rpx;
      }
    }
  }
</style>