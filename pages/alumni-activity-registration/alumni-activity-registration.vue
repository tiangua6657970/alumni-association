<script setup>
  import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
  import { reactive, ref } from 'vue'
  import { useActivityRegistration } from '@/service/alumni-activities'
  const props = defineProps({id: String})
  const data = reactive({ cover: '', title: '', activityTime: '', activityPrice: '' })
  const { form, formRef, rules, submit } = useActivityRegistration(props)
  onLoad(() => {
  })
  onReady(() => {
    formRef.value.setRules(rules)
  })
</script>
<template>
  <view class="alumni-activity-registration">
    <view class="info-container">
      <u-image class="info-container__image" :width="200" :height="140" :src="data.cover" />
      <view class="info-container__content">
        <view class="info-container__content__title">{{ data.title }}</view>
        <view class="info-container__content__date">{{ data.activityTime }}</view>
      </view>
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
        <text class="info-item__content">{{ data.activityPrice }}</text>
      </view>
    </view>
    <aa-fixed-bottom-primary-btn @click="submit">提交</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  page {
    background: #f7f7f7;
  }
  
  .alumni-activity-registration {
    .info-container {
      padding: 30rpx;
      display: flex;
    }
    
    .info-container,
    .u-form,
    .info-list {
      background-color: #fff;
    }
    
    .info-container__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
      
      .info-container__content__title {
        font-size: 32rpx;
        font-weight: 500;
        color: #1a1a1a;
      }
      
      .info-container__content__date {
        font-size: 24rpx;
        color: #999999;
      }
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
