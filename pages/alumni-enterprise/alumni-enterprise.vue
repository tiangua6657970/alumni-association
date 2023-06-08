<script setup>
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import { useSearchAlumniEnterpriseList } from '@/service/alumni-enterprise'
  import { navigateTo, navigateToAlumniEnterpriseCertification, pathMap } from '@/common/navigates'
  import { reactive, ref } from 'vue'
  import useIndustryCategoryList from '@/service/common/use-industry-category-list'

  const {
    query,
    searchResult,
    loadStatus,
    noData,
    refresh,
    loadMore,
    setParamsAndRefresh,
    resetParamsAndRefresh
  } = useSearchAlumniEnterpriseList()
  const { industryCategoryList, refresh: refreshIndustryCategoryList } = useIndustryCategoryList()
  const industrySelectorShow = ref(false)
  const addressSelectorShow = ref(false)
  const showFilterItems = reactive({})
  refresh()
  refreshIndustryCategoryList()
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    // await refresh()
    for (const showFilterItemsKey in showFilterItems) {
      showFilterItems[showFilterItemsKey] = undefined
      delete showFilterItems[showFilterItemsKey]
    }
    await resetParamsAndRefresh()
    uni.stopPullDownRefresh()
  })

  function handleItemClick(item) {
    navigateTo(pathMap.alumniEnterpriseDetail, { id: item.id })
  }

  function handleAddressSelectionConfirm(result) {
    const { province, city, area } = result
    setParamsAndRefresh('region', [province.code, city.code, area.code])
    showFilterItems.region = `${province.name}-${city.name}-${area.name}`
  }

  function handleIndustrySelectionConfirm(result) {
    const { value, label } = result[result.length - 1]
    setParamsAndRefresh('industryId', value)
    showFilterItems.industry = label
  }

  function handleSelectTab(item) {
    if (item.name === '行业') industrySelectorShow.value = true
    if (item.name === '地区') addressSelectorShow.value = true
  }

  function handleFilterItemClick(key) {
    showFilterItems[key] = undefined
    delete showFilterItems[key]
    setParamsAndRefresh(key, undefined)
  }
</script>
<template>
  <view class="alumni-enterprise aa-container">
    <u-search placeholder="日照香炉生紫烟" v-model="query" @search="refresh" @custom="refresh"></u-search>
    <aa-select-tab
      customClass="mt-30 mb-30"
      :list="[{ name: '行业' }, { name: '地区' }]"
      @itemClick="handleSelectTab"
    />
    <aa-show-filter-items customClass="mb-30" :items="showFilterItems" @itemClick="handleFilterItemClick" />
    <aa-has-avatar-content-list :list="searchResult" @itemClick="handleItemClick">
      <template #bottom>
        <u-loadmore :status="loadStatus" v-if="searchResult.length" @loadmore="loadMore" />
      </template>
    </aa-has-avatar-content-list>
    <aa-empty :show="noData" :top="162"></aa-empty>
    <aa-fixed-bottom-right @click="navigateToAlumniEnterpriseCertification">
      认证
    </aa-fixed-bottom-right>
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
  .aa-has-avatar-content-list {
    margin-bottom: calc(80rpx + 96rpx);
  }

  .u-empty {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
