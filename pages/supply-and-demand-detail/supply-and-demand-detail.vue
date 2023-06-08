<script setup>
  import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
  import { useSupplyAndDemandDetail } from '@/service/supply-and-demand'
  import { navigateToAlumniEnterpriseDetail } from '@/common/navigates'

  const props = defineProps(['id'])
  const { detailData: data, refresh } = useSupplyAndDemandDetail(props)
  function getShareVal() {
    const { title } = data
    return {
      title,
      imageUrl: ''
    }
  }
  onShareAppMessage(getShareVal)
  onShareTimeline(getShareVal)
  refresh()
</script>
<template>
  <view class="supply-and-demand-details">
    <view class="content aa-container">
      <view class="aa-font-title">{{ data.title }}</view>
      <aa-name-datetime-count
        root-class="mt-20"
        :name="data.typeText"
        :datetime="data.datetime"
        :count="data.browseCount"
        :type="data.type"
      />
      <aa-info-list root-class="ptb-30 u-border-bottom" :list="data.infoList" />
      <!--<view class="aa-font-paragraph"><u-parse :html="data.paragraph"></u-parse></view>-->
      <view class="aa-font-paragraph mt-30">{{ data.paragraph }}</view>
    </view>
    <aa-has-avatar-content-item
      root-class="aa-container mt-30"
      :data="data.enterpriseInfo"
      @click="navigateToAlumniEnterpriseDetail"
    />
    <aa-fixed-bottom-primary-btn>联系Ta</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .supply-and-demand-details {
    .content {
      background-color: #fff;
    }
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>