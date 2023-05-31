<script setup>
  import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
  import { useSearchAlumniList } from '@/service/alumni-and-alumni-association'
  import { selectedAlumniList } from '@/stores/certification'
  import { navigateToAlumniDetail } from '@/common/navigates'

  const { refresh, query, searchResult, loadMore, loadStatus } = useSearchAlumniList()
  onLoad(() => {
    refresh()
  })
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    await refresh()
    uni.stopPullDownRefresh()
  })

  function handleCheckboxChange(item) {
    const index = selectedAlumniList.findIndex(_item => _item.id === item.id)
    if (index !== -1) {
      item.selected = false
      selectedAlumniList.splice(index, 1)
    } else {
      selectedAlumniList.push(item)
    }
    if (selectedAlumniList.length === 3) {
      searchResult.value.forEach(item => (item.disableCheckBox = true))
      selectedAlumniList.forEach(item => (item.disableCheckBox = false))
    } else {
      searchResult.value.forEach(item => (item.disableCheckBox = false))
    }
  }
  function handleConfirm() {
    uni.navigateBack()
  }
</script>
<template>
  <view class="alumni-list aa-container">
    <u-search placeholder="日照香炉生紫烟" v-model="query" @search="refresh" @custom="refresh"></u-search>
    <aa-has-avatar-content-list
      class="mt-30 aa-fix-fixed-bottom"
      :list="searchResult"
      show-check-box
      @itemClick="navigateToAlumniDetail"
      @checkboxChange="handleCheckboxChange"
    >
      <template #bottom>
        <u-loadmore :status="loadStatus" v-if="searchResult.length" @loadmore="loadMore" />
      </template>
    </aa-has-avatar-content-list>
    <view class="aa-fixed-bottom">
      <aa-selected-alumni-list class="aa-flex-1" :list="selectedAlumniList" v-if="selectedAlumniList.length" />
      <view class="aa-flex-1 u-tips-color" v-else>选择三位认识的校友进行辅助认证</view>
      <u-button class="ml-10" type="primary" @click="handleConfirm">确定</u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .alumni-list {
  }
</style>
