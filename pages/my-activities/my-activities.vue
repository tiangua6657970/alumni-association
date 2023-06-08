<script setup>
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import { navigateToActivityDetail } from '@/common/navigates'
  import { useActivityList } from '@/service/alumni-activities'

  const { activityList, loadStatus, noData, refresh, loadMore } = useActivityList(true)
  refresh()
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    await refresh()
    uni.stopPullDownRefresh()
  })
</script>
<template>
  <view class="my-activities">
    <aa-content-list
      :list="activityList"
      type="leftCover"
      show-status
      :show-top="false"
      @itemClick="navigateToActivityDetail"
    />
    <u-loadmore :status="loadStatus" @loadmore="loadMore" v-if="activityList.length" />
    <aa-empty :show="noData" :top="0" />
  </view>
</template>

<style scoped lang="scss">
  .my-activities {
  }
</style>
