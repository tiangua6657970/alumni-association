<script setup>
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import { useSearchSupplyAndDemandList } from '@/service/supply-and-demand'
  import { navigateToSupplyAndDemandDetail } from '@/common/navigates'

  const { searchResult, noData, loadStatus, refresh, loadMore } = useSearchSupplyAndDemandList()
  refresh()
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    await refresh()
    uni.stopPullDownRefresh()
  })
</script>
<template>
  <view class="my-supply-and-demand">
    <aa-supply-and-demand-list :list="searchResult" @itemClick="navigateToSupplyAndDemandDetail($event)" />
    <u-loadmore :status="loadStatus" v-if="searchResult.length" @loadmore="loadMore" />
    <aa-empty :show="noData"></aa-empty>
  </view>
</template>

<style scoped lang="scss">
  .my-supply-and-demand {
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>