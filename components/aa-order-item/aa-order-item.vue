<script setup>
  import { computed } from 'vue'
  import useNavigate from '@/common/hook/use-navigate'
  const { pathMap, navigateTo } = useNavigate()
  const props = defineProps({ data: { type: Object, default: () => ({}) } })
  const emit = defineEmits(['productItemClick'])
  const statusMap = {
    1: '待付款',
    2: '待收货',
    3: '已完成',
    4: '已消除'
  }
  const btnListMap = {
    1: [
      { name: '取消', path: pathMap, btnType: 'default' },
      { name: '去付款', path: pathMap.payment, btnType: 'primary' }
    ],
    2: [{ name: '查看物流', path: pathMap.shipmentTracking, btnType: 'primary' }],
    3: [{ name: '去评价', path: pathMap.orderReview, btnType: 'success' }],
    4: []
  }
  const btnList = computed(() => btnListMap[props.data.orderStatus] || [])
  function handleBtnItemClick(item) {
    navigateTo(item.path, { id: props.data.id })
  }
</script>
<template>
  <view class="order-item" @click="emit('click')">
    <view class="order-item__header u-border-bottom">
      <view class="order-item__header__num aa-font-info-content">订单编号：{{ data.orderNum }}</view>
      <view class="order-item__header__status" :class="`order-header__status--${data.orderStatus}`"
        >{{ statusMap[data.orderStatus] }}
      </view>
    </view>
    <view class="order-item__product-list">
      <view
        class="product-item u-border-bottom"
        v-for="subItem in data.productList"
        :key="subItem.id"
        @click="emit('productItemClick', subItem)"
      >
        <u-image class="product-item__image" :width="160" :height="120" :src="subItem.productCover" />
        <view class="product-item__content">
          <view class="product-item__name aa-font-title">{{ subItem.productName }}</view>
          <view class="product-item__desc aa-font-desc">黑色|256G</view>
          <view class="product-item__price aa-font-price">￥{{ subItem.productPrice }}</view>
        </view>
        <view class="product-item__count aa-font-info-content">{{ subItem.productCount }}件</view>
      </view>
    </view>
    <view class="total-price mtb-30">
      <text class="total-price__label">订单总额</text>
      <text class="total-price__price aa-font-price">￥{{ data.orderTotalPrice }}</text>
    </view>
    <view class="btn-list">
      <view class="aa-flex-1" v-if="btnList.length === 1"></view>
      <u-button
        class="aa-flex-1"
        :class="{'ml-20': index === 1}"
        :type="item.btnType"
        v-for="(item, index) in btnList"
        :key="item.name"
        @click="handleBtnItemClick(item)"
        >{{ item.name }}</u-button
      >
    </view>
  </view>
</template>

<style scoped lang="scss">
  .order-item {
    padding: 20rpx;
    background: #ffffff;
    margin-bottom: 30rpx;
  }

  .product-item {
    display: flex;
    padding: 30rpx 0;
  }

  .order-item__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;

    .order-header__num {
    }

    .order-header__status {
      font-size: 24rpx;
    }

    .order-header__status--1 {
      color: #ff0a0a;
    }

    .order-header__status--2 {
      color: #1b80c4;
    }

    .order-header__status--3 {
      color: #19be6b;
    }

    .order-header__status--4 {
      color: #666666;
    }
  }

  .product-item__content {
    margin-left: 20rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-item__count {
  }

  .product-item__name {
  }

  .product-item__desc {
  }

  .product-item__price {
  }
  .total-price {
    text-align: right;
  }
  .btn-list {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
