<script setup>
  import { onLoad, onReady, onShow } from '@dcloudio/uni-app'
  import { useAlumniEnterpriseJodDetail } from '@/service/alumni-enterprise'
  const { alumniEnterpriseJodDetail, refreshAlumniEnterpriseJodDetail } = useAlumniEnterpriseJodDetail()
  onLoad(() => {
    refreshAlumniEnterpriseJodDetail()
  })
</script>
<template>
  <view class="job-positions">
    <aa-jod-item :data="alumniEnterpriseJodDetail" />
    <view class="aa-container">
      <aa-blue-bold-name>岗位职责</aa-blue-bold-name>
      <view class="paragraph-list">
        <view
          class="paragraph-item aa-font-paragraph"
          :class="{ 'mb-20': index !== alumniEnterpriseJodDetail.jobResponsibilities.length - 1 }"
          v-for="(item, index) in alumniEnterpriseJodDetail.jobResponsibilities"
          :key="item"
        >
          {{ index + '、' + item }}
        </view>
      </view>
      <aa-blue-bold-name root-class="mt-30">任职要求</aa-blue-bold-name>
      <view class="paragraph-list">
        <view
          class="paragraph-item aa-font-paragraph"
          :class="{
            'aa-fix-fixed-bottom-btn': index === alumniEnterpriseJodDetail.jobResponsibilities.length - 1,
            'mb-20': index !== alumniEnterpriseJodDetail.jobResponsibilities.length - 1
          }"
          v-for="(item, index) in alumniEnterpriseJodDetail.jobResponsibilities"
          :key="item"
        >
          {{ index + '、' + item + item }}
        </view>
      </view>
    </view>
    <aa-fixed-bottom-primary-btn>联系Ta</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .job-positions {
    .paragraph-list {
      margin-top: 30rpx;
    }
  }
  .paragraph-item {
  }
</style>
