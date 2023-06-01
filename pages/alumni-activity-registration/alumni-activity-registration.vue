<script setup>
  import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
  import { reactive, ref } from 'vue'
  import { useAlumniActivityDetail, useActivityRegistration } from '@/service/alumni-activities'
  const props = defineProps({ id: String })
  const { alumniActivityDetail, refresh } = useAlumniActivityDetail(props)
  const { form, formRef, rules, submit } = useActivityRegistration(props)
  refresh()
  onLoad(() => {})
  onReady(() => {
    formRef.value.setRules(rules)
  })
</script>
<template>
  <view class="alumni-activity-registration">
    <view class="aa-container aa-bg-white">
      <aa-left-cover-content :data="alumniActivityDetail" />
    </view>
    <u-form :model="form" ref="formRef">
      <u-form-item label="" prop="name" required>
        <u-input v-model="form.name" maxlength="20" clearable placeholder="请输入参与人姓名" />
      </u-form-item>
      <u-form-item label="" prop="phone" required>
        <u-input v-model="form.phone" maxlength="20" clearable placeholder="请输入参与人手机号" />
      </u-form-item>
    </u-form>
    <view class="info-list">
      <view class="info-item">
        <text class="info-item__label">活动费用</text>
        <text class="info-item__content">{{ alumniActivityDetail.activityPrice }}/ 人</text>
      </view>
    </view>
    <aa-fixed-bottom-primary-btn @click="submit">提交</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .alumni-activity-registration {

    .u-form,
    .info-list {
      background-color: #fff;
    }

    .u-form {
      margin-top: 20rpx;
    }

    .info-list {
      margin-top: 20rpx;

      .info-item {
        padding: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24rpx;
      }
    }
  }

  .u-form-item {
    padding: 10rpx 30rpx;
  }
</style>
<style>
  page {
    background: #f7f7f7;
  }
</style>
