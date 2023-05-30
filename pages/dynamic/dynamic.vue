<script setup>
  import { computed, ref, watch } from 'vue'
  import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
  import { useDynamicList, useDynamicListCategoryList } from '@/service/dynamic'
  import useNavigate from '@/common/hook/use-navigate'
  import { isMock } from '@/common/env'

  const activeIndex = ref(0)
  const { navigateTo, pathMap, navigateToDynamicDetail } = useNavigate()
  const { dynamicListCategoryList, refresh: refreshDynamicListCategoryList } = useDynamicListCategoryList()
  const { loadStatus, dynamicList, noData, refresh, loadMore, setParamsAndRefresh } = useDynamicList()
  watch(activeIndex, newVal => {
    setParamsAndRefresh('cateId', dynamicListCategoryList.value[newVal].id)
  })
  onLoad(async () => {
    await refreshDynamicListCategoryList()
    const dynamicListCategoryListVal = dynamicListCategoryList.value
    if (dynamicListCategoryListVal.length) {
      setParamsAndRefresh('cateId', dynamicListCategoryListVal[0].id)
    }
  })
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    await refresh()
    uni.stopPullDownRefresh()
  })

  function handleItemClick(item) {
    navigateToDynamicDetail({
      id: item.id,
      navigationBarTitle: dynamicListCategoryList.value[activeIndex.value].name + '详情'
    })
  }
</script>
<template>
  <view class="news-and-events">
    <aa-tabs :list="dynamicListCategoryList" v-model="activeIndex" />
    <aa-content-list
      :list="dynamicList"
      :showTop="false"
      type="rightCover"
      @itemClick="handleItemClick"
      v-if="dynamicList.length"
    />
    <u-loadmore :status="loadStatus" v-if="dynamicList.length" @loadmore="loadMore" />
    <aa-empty :show="noData" :top="88" />
  </view>
</template>

<style scoped lang="scss">
  .news-and-events {
  }
</style>
