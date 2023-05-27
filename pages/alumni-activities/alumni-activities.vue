<script setup>
  import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import useNavigate from '@/common/hook/use-navigate'
  import { useActivityList } from '@/service/alumni-activities'

  const { navigateToActivityDetail, navigateToAlumniActivityRegistration } = useNavigate()
  const { activityList, loadStatus, noData, refresh, loadMore } = useActivityList()
  onLoad(refresh)
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    await refresh()
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
