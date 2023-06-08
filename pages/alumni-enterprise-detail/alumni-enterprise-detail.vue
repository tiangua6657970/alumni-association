<script setup>
  import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
  import { ref, watch } from 'vue'
  import { useAlumniEnterpriseDetail } from '@/service/alumni-enterprise'
  import {
    navigateToAlumniEnterpriseDetail,
    navigateToDynamicDetail,
    navigateToJobPositions,
    navigateToSupplyAndDemandDetail
  } from '@/common/navigates'
  import { useSupplyAndDemandList } from '@/service/supply-and-demand'
  import AaGap from '@/components/base/aa-gap/aa-gap.vue'

  const activeIndex = ref(0)
  const {
    alumniEnterpriseDetail,
    refreshAlumniEnterpriseDetail,
    alumniEnterpriseJodList,
    refreshAlumniEnterpriseJodList,
    alumniEnterpriseProductServiceList,
    refreshAlumniEnterpriseProductServiceList,
    alumniAchievementsList,
    refreshAlumniAchievementsList
  } = useAlumniEnterpriseDetail()
  const {
    supplyAndDemandList: alumniEnterpriseSupplyAndDemandList,
    refresh: refreshAlumniEnterpriseSupplyAndDemandList
  } = useSupplyAndDemandList()
  const tabs = [
    { name: '企业简介' },
    { name: '产品服务' },
    { name: '校友招聘' },
    { name: '校友风采' },
    { name: '供需信息' }
  ]
  const fetchMap = {
    0: refreshAlumniEnterpriseDetail,
    1: refreshAlumniEnterpriseProductServiceList,
    2: refreshAlumniEnterpriseJodList,
    3: refreshAlumniAchievementsList,
    4: refreshAlumniEnterpriseSupplyAndDemandList
  }

  function handleEnterpriseProductServiceItemClick(item) {
    navigateToDynamicDetail({ id: item.id, navigationBarTitle: '产品服务详情' })
  }

  function handleAlumniAchievementItemClick(item) {
    navigateToDynamicDetail({ id: item.id, navigationBarTitle: '校友风采详情' })
  }
  watch(activeIndex, newVal => fetchMap[newVal]())

  function getShareVal() {
    const { name: title, cover: imageUrl } = alumniEnterpriseDetail.value
    return {
      title,
      imageUrl
    }
  }

  onShareAppMessage(getShareVal)
  onShareTimeline(getShareVal)
  refreshAlumniEnterpriseDetail()
</script>
<template>
  <view class="alumni-enterprise-detail" v-if="alumniEnterpriseDetail.id">
    <aa-tabs :list="tabs" v-model="activeIndex" />
    <aa-gap :height="20" />
    <template v-if="activeIndex === 0">
      <u-image class="cover" :src="alumniEnterpriseDetail.cover" :height="400" />
      <view class="container">
        <view class="list-info">
          <u-avatar class="list-info__avatar" :size="88" :src="alumniEnterpriseDetail.avatar"></u-avatar>
          <view class="list-info__content">
            <view class="list-info__content__title aa-font-title">{{ alumniEnterpriseDetail.name }}</view>
            <view class="list-info__content__desc aa-font-desc">{{ alumniEnterpriseDetail.desc }}</view>
          </view>
        </view>
        <aa-info-list :list="alumniEnterpriseDetail.infoList1" />
        <aa-blue-bold-name sub root-class="mtb-30">工商信息</aa-blue-bold-name>
        <aa-info-list :list="alumniEnterpriseDetail.infoList2" />
        <aa-blue-bold-name sub root-class="mtb-30">公司简介</aa-blue-bold-name>
        <view class="aa-font-paragraph">{{ alumniEnterpriseDetail.paragraph }}</view>
      </view>
    </template>
    <template v-if="activeIndex === 1">
      <aa-content-list
        :list="alumniEnterpriseProductServiceList"
        @itemClick="handleEnterpriseProductServiceItemClick"
      />
    </template>
    <template v-if="activeIndex === 2">
      <aa-jod-list :list="alumniEnterpriseJodList" @itemClick="navigateToJobPositions($event)" />
    </template>
    <template v-if="activeIndex === 3">
      <aa-content-list :list="alumniAchievementsList" @itemClick="handleAlumniAchievementItemClick" />
    </template>
    <template v-if="activeIndex === 4">
      <aa-supply-and-demand-list
        :list="alumniEnterpriseSupplyAndDemandList"
        @itemClick="navigateToSupplyAndDemandDetail"
        @enterpriseClick="navigateToAlumniEnterpriseDetail"
      />
    </template>
  </view>
</template>

<style scoped lang="scss">
  .alumni-enterprise-detail {
    background-color: #f7f7f7;

    .container {
      padding: 30rpx;
      background-color: #fff;
    }

    .list-info {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;

      .list-info__content {
        flex: 1;
        margin-left: 20rpx;
      }

      .list-info__content__title {
      }

      .list-info__content__desc {
        margin-top: 8rpx;
      }
    }
  }
</style>