<script setup>
  import {
    navigateToAlumniCertification,
    navigateToCustomerAuthentication,
    navigateToStudentIdVerification
  } from '@/common/navigates'
  import { ref } from 'vue'

  const marginTop = ref(0)
</script>
<template>
  <view class="authentication-methods">
    <aa-top-background navbar-title="认证方式" @updateRenderHeight="marginTop = $event">
      <aa-top-background__msg></aa-top-background__msg>
    </aa-top-background>
    <view class="authentication-method-list aa-container" :style="{ marginTop: marginTop + 'px' }">
      <view class="authentication-method-item" @click="navigateToStudentIdVerification">
        <u-image src="@/static/images/authentication-method-1.png" height="100%"></u-image>
        <view class="authentication-method-item__name --1">学号认证</view>
      </view>
      <view class="authentication-method-item --2 mt-30" @click="navigateToAlumniCertification">
        <u-image src="@/static/images/authentication-method-2.png" height="100%"></u-image>
        <view class="authentication-method-item__name --2">校友认证</view>
      </view>
      <view class="authentication-method-item --3 mt-30" @click="navigateToCustomerAuthentication">
        <u-image src="@/static/images/authentication-method-3.png" height="100%"></u-image>
        <view class="authentication-method-item__name --3">客服认证</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .authentication-methods {
    .authentication-method-list {
      margin-top: 212rpx;
    }

    .authentication-method-item {
      height: 280rpx;
      position: relative;

      .authentication-method-item__name {
        position: absolute;
        top: 50%;
        left: 60rpx;
        transform: translateY(-50%);
        font-size: 40rpx;
      }

      .--1 {
        color: #1b80c4;
      }

      .--2 {
        color: #1bc47d;
      }

      .--3 {
        color: #c48a1b;
      }
    }
  }
</style>