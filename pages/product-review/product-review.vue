<script setup>
  import { useProductReviewList } from '@/service/shop'

  const { productReviewList, refresh } = useProductReviewList()
  refresh()
</script>
<template>
  <view class="product-review aa-container">
    <view class="product-review-list">
      <view class="product-review-item" v-for="item in productReviewList" :key="item.id">
        <view class="product-review-item__header u-border-bottom">
          <u-avatar :size="60" :src="item.reviewerAvatar" />
          <view class="aa-font-title">{{ item.reviewerName }}</view>
          <view class="aa-font-mini">{{ item.reviewDatetime }}</view>
        </view>
        <view class="product-review-item__content">
          <view class="product-review-item__content-header">
            <u-rate :model-value="item.reviewScore" :size="20" disabled></u-rate>
            <text class="aa-font-desc">{{ item.productSku }}</text>
          </view>
          <view class="aa-font-paragraph">{{ item.paragraph }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .product-review {
    .product-review-item {
      padding: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 8rpx;
      background: #ffffff;

      .product-review-item__header {
        display: flex;
        align-items: center;
        padding: 0 20rpx 20rpx 20rpx;

        .aa-font-title {
          flex: 1;
          margin-left: 20rpx;
        }
      }

      .product-review-item__content-header {
        display: flex;
        align-items: center;
        margin: 20rpx 0;

        .aa-font-desc {
          margin-left: 20rpx;
        }
      }
    }
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>