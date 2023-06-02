<script setup>
  import { navigateToAuthenticationMethods, switchTabToIndex } from '@/common/navigates'

</script>
<template>
  <view class="alumni-certification">
    <u-navbar
      :is-back="false"
      :border-bottom="false"
      :background="{ background: 'transparent' }"
      title-color="#fff"
      back-text="返回"
      title="校友认证"
    >
    </u-navbar>
    <view class="background"> </view>
    <view class="aa-container container">
      <u-image src="@/static/images/logo.png" width="219" height="219" />
      <view class="mt-20 aa-font-base">您还未认证校友</view>
      <u-button class="mt-40 w-100p" type="primary" @click="navigateToAuthenticationMethods">去认证</u-button>
      <u-button class="mt-40 w-100p" type="primary" @click="switchTabToIndex">去首页</u-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
  page {
  }
  .alumni-certification {
  }
  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(45deg, rgba(18, 118, 198, 1), rgb(136, 163, 255));
  }

  .container {
    background-color: #fff;
    position: absolute;
    left: 50rpx;
    right: 50rpx;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20rpx;
  }
</style>
