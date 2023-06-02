<script setup>
  import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
  import { useSearchAlumniListAndAlumniAssociationList } from '@/service/alumni-and-alumni-association'
  import { navigateTo, pathMap } from '@/common/navigates'

  const { query, searchResult, loadStatus, currentView, refresh, loadMore } =
    useSearchAlumniListAndAlumniAssociationList()
  refresh()
  onReachBottom(loadMore)
  onPullDownRefresh(async () => {
    await refresh()
    uni.stopPullDownRefresh()
  })

  function handleItemClick(item) {
    if (currentView.value === 'left') {
      navigateTo(pathMap.alumniAssociationDetail, { id: item.id })
    } else {
      navigateTo(pathMap.alumniDetail, { id: item.id })
    }
  }
</script>
<template>
  <div class="alumni-and-alumni-association-list">
    <u-search
      :placeholder="currentView === 'left' ? '输入城市、校友会名字' : '输入校友名字'"
      v-model="query"
      @search="refresh"
      @custom="refresh"
    ></u-search>
    <view class="tab">
      <u-button
        class="tab-item"
        :custom-style="{ width: '100%' }"
        :type="currentView === 'left' ? 'primary' : 'default'"
        size="medium"
        shape="circle"
        @click="currentView = 'left'"
        >校友会
      </u-button>
      <u-button
        :custom-style="{ width: '100%' }"
        class="tab-item"
        :type="currentView === 'right' ? 'primary' : 'default'"
        size="medium"
        shape="circle"
        @click="currentView = 'right'"
        >校友
      </u-button>
    </view>
    <aa-has-avatar-content-list :list="searchResult" @itemClick="handleItemClick">
      <template #bottom>
        <u-loadmore :status="loadStatus" v-if="searchResult.length" @loadmore="loadMore" />
      </template>
    </aa-has-avatar-content-list>
  </div>
</template>

<style scoped lang="scss">
  .alumni-and-alumni-association-list {
    padding: 30rpx;

    .tab {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30rpx 0;

      .tab-item {
        flex: 1;

        &.tab-item:nth-last-child(1) {
          margin-left: 80rpx;
        }
      }
    }
  }
</style>
