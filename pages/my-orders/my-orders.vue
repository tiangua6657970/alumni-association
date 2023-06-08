<script setup>
  import { ref, watch } from 'vue'
  import { useSearchOrderList } from '@/service/personal-center'
  import { navigateToMyOrdersDetail } from '@/common/navigates'

  const { searchResult, query, refresh, noData, loadMore, loadStatus, setParamsAndRefresh } = useSearchOrderList()
  const activeIndex = ref(0)
  const tabs = [{ name: '全部' }, { name: '待付款' }, { name: '待收货' }, { name: '已完成' }, { name: '已消除' }]
  refresh()
  watch(activeIndex, newVal => setParamsAndRefresh('type', newVal))
</script>
<template>
  <div class="my-orders aa-container">
    <u-search v-model="query" @search="refresh" @custom="refresh"></u-search>
    <aa-tabs :list="tabs" v-model="activeIndex" />
    <view class="order-list mt-30">
      <aa-order-item
        v-for="item in searchResult"
        :data="item"
        :key="item.id"
        @click="navigateToMyOrdersDetail(item)"
      />
    </view>
  </div>
</template>

<style scoped lang="scss"></style>
<style>
  page {
    background: #f7f7f7;
  }
</style>