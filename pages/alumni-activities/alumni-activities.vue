<script setup>
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import { navigateToActivityDetail, navigateToAlumniActivityRegistration } from '@/common/navigates'
  import { useActivityList } from '@/service/alumni-activities'

  const { activityList, loadStatus, noData, refresh, loadMore } = useActivityList()
  refresh()
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    const test = await refresh()
    uni.stopPullDownRefresh()
  })
</script>

<template>
  <view class="activities">
    <aa-content-list
      :list="activityList"
      type="leftCover"
      :show-top="false"
      show-status
      @itemClick="navigateToActivityDetail"
      @itemBtnClick="navigateToAlumniActivityRegistration"
    />
    <u-loadmore :status="loadStatus" v-if="activityList.length" @loadmore="loadMore" />
    <aa-empty :show="noData" />
  </view>
</template>

<style scoped lang="scss">
  .activities {
  }
</style>