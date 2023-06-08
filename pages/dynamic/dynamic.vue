<script setup>
  import { ref, watch } from 'vue'
  import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import { useDynamicList, useDynamicListCategoryList } from '@/service/dynamic'
  import { navigateToDynamicDetail } from '@/common/navigates'
  import AaGap from '@/components/base/aa-gap/aa-gap.vue'

  const activeIndex = ref(0)
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
    <aa-gap :height="20" />
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
    background-color: #f7f7f7;
  }
</style>