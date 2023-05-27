<script setup>
  import { reactive, ref, watch } from 'vue'
  import { onLoad, onReady, onShow } from '@dcloudio/uni-app'
  import { useAlumniEnterpriseDetail } from '@/service/alumni-enterprise'
  import useNavigate from '@/common/hook/use-navigate'
  import { useSupplyAndDemandList } from '@/service/supply-and-demand'
  const { navigateToJobPositions, navigateToSupplyAndDemandDetail } = useNavigate()
  const activeIndex = ref(0)
  const {
    alumniEnterpriseDetail,
    refreshAlumniEnterpriseDetail,
    alumniEnterpriseJodList,
    refreshAlumniEnterpriseJodList
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
  onLoad(() => {
    refreshAlumniEnterpriseDetail()
  })
  const fetchMap = {
    0: refreshAlumniEnterpriseDetail,
    2: refreshAlumniEnterpriseJodList,
    4: refreshAlumniEnterpriseSupplyAndDemandList
  }
  watch(activeIndex, newVal => fetchMap[newVal]())

  function handleJodItemClick(item) {}
</script>
<template>
  <view class="alumni-enterprise-detail">
    <aa-tabs :list="tabs" v-model="activeIndex" />
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
    <template v-if="activeIndex === 2">
      <aa-jod-list :list="alumniEnterpriseJodList" @itemClick="navigateToJobPositions($event)" />
    </template>
    <template v-if="activeIndex === 4">
      <aa-supply-and-demand-list
        :list="alumniEnterpriseSupplyAndDemandList"
        @itemClick="navigateToSupplyAndDemandDetail"
      />
    </template>
  </view>
</template>

<style scoped lang="scss">
  page {
    background-color: #f7f7f7;
  }
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
