
<script setup>
  import {  useDynamicDetail } from '@/service/dynamic'
  import { onLoad } from '@dcloudio/uni-app'
  const props = defineProps({ id: String })
  const { dynamicDetail, refresh } = useDynamicDetail(props)
  onLoad(async () => {
    refresh()
  })
</script>
<template>
  <view class="news-and-events-detail">
    <view class="title">{{ dynamicDetail.title }}</view>
    <view class="datetime">{{ dynamicDetail.datetime }}</view>
    <view class="aa-font-paragraph">{{ dynamicDetail.paragraph }}</view>
  </view>
</template>

<style scoped lang="scss">
  .news-and-events-detail {
    padding: 30rpx;
    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #1a1a1a;
    }
    .datetime {
      font-size: 20rpx;
      color: #999999;
      margin-top: 24rpx;
    }
    .aa-font-paragraph {
      margin-top: 24rpx;
    }
  }
</style>
