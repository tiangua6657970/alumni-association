<script setup>
  import { useSearchSupplyAndDemandList } from '@/service/supply-and-demand'
  import { onPullDownRefresh, onReachBottom, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
  import {
    navigateToAlumniEnterpriseDetail,
    navigateToPostDemandAndSupply,
    navigateToSupplyAndDemandDetail
  } from '@/common/navigates'
  import { reactive, ref } from 'vue'
  import useIndustryCategoryList from '@/service/common/use-industry-category-list'
  import { TYPE_LIST } from '@/common/constants'

  const {
    query,
    refresh,
    searchResult,
    loadStatus,
    noData,
    loadMore,
    setParamsAndRefresh,
    resetParamsAndRefresh
  } = useSearchSupplyAndDemandList()
  const { industryCategoryList, refresh: refreshIndustryCategoryList } = useIndustryCategoryList()
  const typeSelectorShow = ref(false)
  const industrySelectorShow = ref(false)
  const addressSelectorShow = ref(false)
  const showFilterItems = reactive({})

  function handleSelectTab(item) {
    if (item.name === '类型') typeSelectorShow.value = true
    if (item.name === '行业') industrySelectorShow.value = true
    if (item.name === '地区') addressSelectorShow.value = true
  }

  function handleTypeSelectionConfirm(result) {
    const { value, label } = result[0]
    setParamsAndRefresh('type', value)
    showFilterItems.type = label
  }

  function handleIndustrySelectionConfirm(result) {
    const { value, label } = result[result.length - 1]
    setParamsAndRefresh('industryId', value)
    showFilterItems.industry = label
  }

  function handleAddressSelectionConfirm(result) {
    const { province, city, area } = result
    setParamsAndRefresh('region', [province.code, city.code, area.code])
    showFilterItems.region = `${province.name}-${city.name}-${area.name}`
  }

  function handleFilterItemClick(key) {
    showFilterItems[key] = undefined
    delete showFilterItems[key]
    setParamsAndRefresh(key, undefined)
  }
  function getShareVal() {
    return {
      title: '校友会供需'
    }
  }
  onShareAppMessage(getShareVal)
  onShareTimeline(getShareVal)
  refresh()
  refreshIndustryCategoryList()
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    for (const showFilterItemsKey in showFilterItems) {
      showFilterItems[showFilterItemsKey] = undefined
      delete showFilterItems[showFilterItemsKey]
    }
    await resetParamsAndRefresh()
    uni.stopPullDownRefresh()
  })
</script>
<template>
  <view class="supply-and-demand">
    <view class="aa-container">
      <u-search
        margin="0 0 30rpx 0"
        placeholder="日照香炉生紫烟"
        v-model="query"
        @search="refresh"
        @custom="refresh"
      ></u-search>
      <aa-select-tab :list="[{ name: '类型' }, { name: '行业' }, { name: '地区' }]" @itemClick="handleSelectTab" />
      <aa-show-filter-items :items="showFilterItems" @itemClick="handleFilterItemClick" />
    </view>
    <aa-supply-and-demand-list
      root-class="mt-20"
      :list="searchResult"
      @itemClick="navigateToSupplyAndDemandDetail"
      @enterpriseClick="navigateToAlumniEnterpriseDetail"
      v-if="searchResult.length"
    />
    <u-loadmore :status="loadStatus" @loadmore="loadMore" v-if="searchResult.length" />
    <aa-empty :show="noData" :top="192" />
    <aa-fixed-bottom-right @click="navigateToPostDemandAndSupply">
      <template #default>
        <u-icon name="plus" :size="40" />
      </template>
    </aa-fixed-bottom-right>
    <u-select v-model="typeSelectorShow" :list="TYPE_LIST" @confirm="handleTypeSelectionConfirm"></u-select>
    <u-select
      v-model="industrySelectorShow"
      mode="mutil-column-auto"
      :list="industryCategoryList"
      label-name="name"
      value-name="id"
      @confirm="handleIndustrySelectionConfirm"
    ></u-select>
    <u-picker v-model="addressSelectorShow" mode="region" @confirm="handleAddressSelectionConfirm"></u-picker>
  </view>
</template>

<style scoped lang="scss">
  .supply-and-demand {
  }

  .aa-container {
    background-color: #fff;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>