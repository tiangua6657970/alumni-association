<script setup>
  import { onLoad, onReady } from '@dcloudio/uni-app'
  import { useAlumniDetail } from '@/service/alumni-and-alumni-association'
  import { useSupplyAndDemandList } from '@/service/supply-and-demand'
  import { navigateToSupplyAndDemandDetail, navigateToAlumniEnterpriseDetail } from '@/common/navigates'
  import { systemInfo } from '@/stores/system-info'
  import { ref } from 'vue'
  
  const { alumniDetail, refresh } = useAlumniDetail()
  const { supplyAndDemandList, refresh: refreshSupplyAndDemandList } = useSupplyAndDemandList()
  const marginTop = ref(0)
  onLoad(() => {
    console.log(systemInfo)
    refresh()
    refreshSupplyAndDemandList()
  })
  onReady(() => {
  })
</script>
<template>
  <view class="alumni-detail">
    <aa-top-background :height="400" navbar-title="校友详情" @updateRenderHeight="marginTop = $event" />
    <view class="wrapper" :style="{ marginTop: marginTop + 'px' }">
      <view class="pt-30 plr-30">
        <view class="inner-container top--60">
          <aa-blue-bold-name>{{ alumniDetail.name }}</aa-blue-bold-name>
          <aa-info-list root-class="mt-20" :list="alumniDetail.infoList" />
          <view class="aa-font-paragraph-title mtb-30">个人简介</view>
          <view class="aa-font-paragraph">{{ alumniDetail.paragraph }}</view>
          <u-avatar
            class="avatar"
            :sex-icon="alumniDetail.sex"
            show-sex
            :size="180"
            :src="alumniDetail.avatar"
          ></u-avatar>
          <aa-button class="aa-button">联系Ta</aa-button>
        </view>
      </view>
      <view class="aa-font-paragraph-title mtb-30">Ta供需</view>
      <view class="aa-container">
        <aa-supply-and-demand-list
          :list="supplyAndDemandList"
          @itemClick="navigateToSupplyAndDemandDetail"
          @enterpriseClick="navigateToAlumniEnterpriseDetail"
          v-if="supplyAndDemandList.length"
        />
      </view>
      <view class="aa-font-paragraph-title mtb-30">Ta企业</view>
      <view class="pb-30 plr-30">
        <view class="inner-container">
          <aa-has-avatar-content-item
            :data="alumniDetail.enterpriseInfo"
            @click="navigateToAlumniEnterpriseDetail"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    top: -60rpx;
  }
  
  .alumni-detail {
    .inner-container {
      padding: 20rpx;
      background-color: #ffffff;
      border-radius: 20rpx;
    }
    
    .avatar {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
    }
    
    .aa-button {
      position: absolute;
      top: 50rpx;
      right: 50rpx;
    }
    
    .top--60 {
      position: relative;
    }
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>
