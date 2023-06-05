<script setup>
  import { useProductDetail } from '@/service/shop'
  import { navigateTo, pathMap } from '@/common/navigates'
  import useShoppingCart from '@/stores/shopping-cart'
  import { computed } from 'vue'

  const { productDetail, refresh } = useProductDetail()
  const shoppingCart = useShoppingCart()
  refresh()

  const blockList = computed(() => {
    // const selectedProductAttributesVal = selectedProductAttributes.value
    // const result = selectedProductAttributesVal.map(item => item.name).join(',')
    return [
      {
        label: '选择',
        content: '已选：黑色，256G'
      },
      { label: '评价', content: '', path: pathMap.productReview }
    ]
  })

  function handleBlockItemClick(item) {
    if (!item.path) {
      return uni.$u.toast('功能未实现')
    }
    navigateTo(item.path, { id: productDetail.id })
  }

  const btnList = computed(() => {
    return [
      { text: productDetail.isAddedToCart ? '已加入购物车' : '加入购物车', type: 'info' },
      { text: '立即购买' }
    ]
  })

  function handleBtnItemCLick(item) {
    if (item.text === '加入购物车') {
      shoppingCart.add(productDetail)
    } else if (item.text === '已加入购物车') {
    } else if (item.text === '立即购买') {
    }
  }
</script>
<template>
  <view class="product-details">
    <u-image :src="productDetail.productCover" height="400" />
    <view class="top-block">
      <view class="top-block__left">
        <view class="top-block__name aa-font-title">{{ productDetail.productName }}</view>
        <view class="top-block__price aa-font-price">￥{{ productDetail.productPrice }}</view>
      </view>
      <view class="top-block__sales aa-font-desc">销量{{ productDetail.productSales }}</view>
    </view>
    <view class="info-block-list">
      <view
        class="info-block-item"
        v-for="item in blockList"
        :key="item.label"
        @click="handleBlockItemClick(item)"
      >
        <text class="info-block-item__label aa-font-desc">{{ item.label }}</text>
        <text class="info-block-item__content aa-font-info-content">{{ item.content }}</text>
        <u-icon name="arrow-right" color="#999" />
      </view>
    </view>
    <view class="bottom-block">
      <view class="aa-font-paragraph-title">介绍</view>
      <view class="aa-font-paragraph">{{ productDetail.paragraph }}</view>
    </view>
    <aa-fixed-bottom
      btn-class="mr-20"
      :show-contact="false"
      :btn-list="btnList"
      @btnItemClick="handleBtnItemCLick"
    >
    </aa-fixed-bottom>
  </view>
</template>

<style scoped lang="scss">
  .product-details {
    .top-block,
    .info-block-item,
    .bottom-block {
      padding: 30rpx;
      background-color: #fff;
      margin-bottom: 20rpx;
    }

    .top-block {
      display: flex;
      align-items: center;

      .top-block__left {
        flex: 1;
      }

      .top-block__price {
        margin-top: 10rpx;
      }
    }

    .info-block-item {
      display: flex;
      align-items: center;

      .info-block-item__content {
        flex: 1;
        margin-left: 30rpx;
      }

      .info-block-item__label {
      }
    }
  }

  .aa-font-paragraph {
    margin-top: 20rpx;
    background-color: #fff;
    margin-bottom: 120rpx;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>