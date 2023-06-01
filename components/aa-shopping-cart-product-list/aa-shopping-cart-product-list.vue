<template>
  <view class="aa-shopping-cart-product-list">
    <template v-if="list.length">
      <view
        class="aa-shopping-cart-product-item"
        :class="{ 'u-border-bottom': tbBorder, 'u-border-top': tbBorder }"
        v-for="(item, index) in list"
        :key="item.id"
      >
        <u-checkbox :size="30" :label-size="0" :name="index" shape="circle" v-model="item.selected" />
        <u-image class="product-cover" width="160" height="120" :src="item.productCover" />
        <view class="product-info">
          <view class="aa-font-title">{{ item.productName }}</view>
          <view class="aa-font-desc">已选：黑色，256G</view>
          <view class="aa-font-price">￥{{ item.productPrice }}</view>
        </view>
        <u-icon
          class="remove"
          size="30"
          custom-prefix="custom-icon"
          name="delete"
          v-if="showRemove"
          @click="$emit('remove', item)"
        />
        <u-number-box v-model="item.count" :min="1" :max="item.productStock"></u-number-box>
      </view>
    </template>
    <template v-else>
      <aa-empty :show="!list.length" mode="car"/>
    </template>
  </view>
</template>

<script>
  export default {
    name: 'shopping-cart-product-list',
    emits: ['remove'],
    options: {
      styleIsolation: 'shared'
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      showRemove: {
        type: Boolean,
        default: true
      },
      tbBorder: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-shopping-cart-product-list {
    :deep(.u-checkbox__label) {
      margin: 0;
    }
    .aa-shopping-cart-product-item {
      &:nth-last-child(1) {
        margin-bottom: 110rpx;
      }
      position: relative;
      margin-bottom: 20rpx;
      background-color: #fff;
      padding: 20rpx;
      display: flex;
      align-items: center;
      .product-cover {
        margin-left: 10rpx;
      }
      .product-info {
        flex: 1;
        margin-left: 10rpx;
      }
      .aa-font-desc,
      .aa-font-price {
        margin-top: 10rpx;
      }
      .remove {
        position: absolute;
        top: 20rpx;
        right: 20rpx;
      }
      .u-numberbox {
        position: absolute;
        bottom: 20rpx;
        right: 20rpx;
      }
    }
  }
</style>
