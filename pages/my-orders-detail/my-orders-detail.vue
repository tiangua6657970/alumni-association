<script setup>
  import { useOrderDetail } from '@/service/personal-center'
  import { navigateToProductDetail } from '@/common/navigates'

  const props = defineProps({ id: Number })
  const { orderDetail, refresh } = useOrderDetail(props)
  refresh()
</script>
<template>
  <div class="my-orders-detail aa-container">
    <aa-order-item :data="orderDetail" @productItemClick="navigateToProductDetail" />
    <view class="aa-block mt-20">
      <aa-info-list :list="orderDetail.infoList" />
    </view>
    <view class="aa-block mt-20">
      <view class="aa-font-title mb-20">配送信息</view>
      <aa-info-list :list="orderDetail.infoList2" />
    </view>
  </div>
</template>

<style scoped lang="scss">
  .order-item {
    margin-bottom: 0;
  }

  .my-orders-detail {
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>