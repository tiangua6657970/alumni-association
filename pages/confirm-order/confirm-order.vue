<script setup>
  import  { selectedDeliveryAddress } from '@/stores/personal-center'
  import useShoppingCart from '@/stores/shopping-cart'
  import { navigateToAddDeliveryAddress, navigateToDeliveryAddress, navigateToPayment } from '@/common/navigates'

  const shoppingCart = useShoppingCart()

  function handleSubmit() {
    shoppingCart.clear()
    navigateToPayment({ orderId: '12304' })
  }
</script>
<template>
  <view class="confirm-order aa-container">
    <view class="container">
      <aa-delivery-address-item
        bg-color="#fff"
        v-if="selectedDeliveryAddress"
        :data="selectedDeliveryAddress"
        action-mode="select"
        @click="navigateToDeliveryAddress({ showSelect: true })"
      />
      <u-empty text="你还没有添加收货地址" mode="list" v-else>
        <template #bottom>
          <view class="add-delivery-address ptb-20" @click="navigateToAddDeliveryAddress">
            <u-icon
              name="plus"
              class="u-add-btn"
              size="36"
              color="#2b85e4"
              label-color="#2b85e4"
              label="添加收货地址"
            ></u-icon>
          </view>
        </template>
      </u-empty>
      <aa-shopping-cart-product-list :list="shoppingCart.shoppingCartStore" :show-remove="false" tb-border />
      <view class="order-info-list">
        <view class="order-info-item">
          <view class="order-info-item__name aa-font-base">订单总价</view>
          <view class="order-info-item__content aa-font-price">
            ￥
            <u-count-to
              color="#ff5200"
              :font-size="24"
              :start-val="shoppingCart.oldTotalPrice"
              :end-val="shoppingCart.totalPrice"
            />
          </view>
        </view>
        <view class="order-info-item">
          <view class="order-info-item__name aa-font-base">配送方式</view>
          <view class="order-info-item__content aa-font-base">快递|包邮</view>
        </view>
      </view>
    </view>
    <view class="aa-fixed-bottom">
      <aa-total-price
        class="aa-flex-1"
        :start-val="shoppingCart.oldTotalPrice"
        :end-val="shoppingCart.totalPrice"
      />
      <u-button class="aa-flex-1" type="primary" @click="handleSubmit">提交订单</u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .confirm-order {
  }

  :deep(.aa-shopping-cart-product-item) {
    margin-bottom: 0 !important;
  }

  .container {
    background-color: #fff;
    margin-bottom: 120rpx;

    .order-info-list {
      padding: 20rpx;
    }

    .order-info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
    }
  }

  .u-empty {
    padding: 20rpx;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>