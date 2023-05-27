<script setup>
  import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
  import { useAlumniAssociationList } from '@/service/alumni-and-alumni-association'
  import { selectedAlumniAssociation } from '@/stores/certification'
  import useNavigate from '@/common/hook/use-navigate'
  const { navigateToAlumniAssociationDetail } = useNavigate()
  const { query, loadStatus, searchResult, refresh, loadMore } = useAlumniAssociationList()

  onLoad(() => {
    refresh()
  })


  function handleCheckboxChange(item) {
    selectedAlumniAssociation.value = item
    searchResult.value.forEach(_item => (_item.selected = _item.id === item.id))
  }
</script>
<template>
  <view class="alumni-association-list aa-container">
    <u-search placeholder="日照香炉生紫烟" v-model="query" @search="refresh" @custom="refresh"></u-search>
    <aa-has-avatar-content-list
      class="mt-30 aa-fix-fixed-bottom"
      :list="searchResult"
      show-check-box
      @itemClick="navigateToAlumniAssociationDetail"
      @checkboxChange="handleCheckboxChange"
    />
  </view>
</template>

<style scoped lang="scss">
  .alumni-association-list {
  }
</style>
