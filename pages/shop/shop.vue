<script setup>
  import { onLoad, onPageScroll, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import { nextTick, ref, watch } from 'vue'
  import { useSearchProductList } from '@/service/shop'
  import { navigateToProductDetail, navigateToShoppingCart } from '@/common/navigates'
  import useShoppingCart from '@/stores/shopping-cart'
  import AaGap from "@/components/base/aa-gap/aa-gap.vue";

  const tabs = [{ name: '全部' }, { name: '类别' }, { name: '销量' }, { name: '价格' }]
  const activeIndex = ref(0)
  const scrollTop = ref(0)
  const marginTop = ref(0)
  const {
    query,
    searchResult,
    refreshFactory,
    loadMore,
    loadStatus,
    noData,
    setParamsAndRefreshFactory,
    resetParamsAndRefreshFactory
  } = useSearchProductList(refreshCallback)
  const shoppingCart = useShoppingCart()

  // 瀑布流组件的bug，刷新、切换的时候要先重置列表再赋值能解决
  function refreshCallback() {
    const temp = searchResult.value
    searchResult.value = []
    nextTick(() => {
      searchResult.value = temp
    })
  }

  const setParamsAndRefresh = setParamsAndRefreshFactory(refreshCallback)
  const resetParamsAndRefresh = resetParamsAndRefreshFactory(refreshCallback)

  const refresh = refreshFactory(refreshCallback)

  watch(activeIndex, newVal => {
    setParamsAndRefresh('type', tabs[newVal])
  })
  onLoad(() => {
    refresh()
  })
  onPullDownRefresh(async () => {
    await refresh()
    uni.stopPullDownRefresh()
  })
  onReachBottom(() => {
    loadMore()
  })

  onPageScroll(e => {
    scrollTop.value = e.scrollTop
  })

  function handleProductIconClick(item) {
    shoppingCart.toggle(item)
  }
</script>
<template>
  <view class="shop">
    <aa-top-background :height="400" navbar-title="商城" :is-back="false" @updateRenderHeight="marginTop = $event">
      <template #default>
        <!-- 加一层view是为兼容小程序 不然padding不生效-->
        <view class="search">
          <u-search
            placeholder="搜索商品、商家"
            :action-style="{ color: '#fff' }"
            v-model="query"
            @search="refresh"
            @custom="refresh"
          ></u-search>
        </view>
      </template>
    </aa-top-background>
    <view class="aa-container" :style="{ marginTop: marginTop + 'px' }">
      <aa-tabs :list="tabs" v-model="activeIndex" />
      <aa-gap :height="20"/>
      <pp-waterfall-flow
        :value="searchResult"
        @iconClick="handleProductIconClick"
        @clickItem="navigateToProductDetail(searchResult[$event])"
        @clickImage="navigateToProductDetail(searchResult[$event])"
      ></pp-waterfall-flow>
      <u-loadmore :status="loadStatus" v-if="searchResult.length" @loadmore="loadMore" />
      <aa-empty :show="noData" :top="400 + 88" />
    </view>
    <aa-fixed-bottom-right @click="navigateToShoppingCart">
      <template #default>
        <u-icon custom-prefix="custom-icon" name="shop-cart" :size="40" />
        <u-badge
          size="mini"
          type="success"
          :count="shoppingCart.shoppingCartStore.length"
          :offset="[-10, -10]"
          bg-color="#FF0000"
        ></u-badge>
      </template>
    </aa-fixed-bottom-right>
  </view>
</template>

<style scoped lang="scss">
  .shop {
  }

  .search {
    position: absolute;
    left: 50%;
    bottom: 30rpx;
    transform: translateX(-50%);
    padding: 0 30rpx;
    width: 100%;
  }

  .aa-container {
    margin-top: 312rpx;
    background-color: #f7f7f7;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>
