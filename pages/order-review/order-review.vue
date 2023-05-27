<script setup>
  import { reactive, ref } from 'vue'
  import { serverConfig } from '@/service/base'
  const form = reactive({
    reviewScore: 0,
    paragraph: ''
  })
  function save() {}
</script>
<template>
  <view class="order-review">
    <view class="aa-container">
      <view class="header">
        <u-rate v-model="form.reviewScore" :size="32"></u-rate>
      </view>
      <u-field :label-width="0" v-model="form.paragraph" type="textarea" clearable placeholder="请输入您的宝贵意见" />
    </view>
    <view class="add-image aa-container">
      <view class="aa-font-title">添加图片</view>
      <u-upload :action="serverConfig.baseUrl"></u-upload>
    </view>
    <aa-submit-button @click="save">保存</aa-submit-button>
  </view>
</template>

<style scoped lang="scss">
  page {
    background-color: #f7f7f7;
  }
  .aa-container {
    background-color: #fff;
  }
  .order-review {
  }
  .header {
    display: flex;
    align-items: center;
  }
  .u-field {
    margin-top: 60rpx;
    height: 380rpx;
    background-color: #f7f7f7;
  }
  .add-image {
    margin-top: 30rpx;
  }
  .u-upload {
    margin-top: 20rpx;
  }
  .aa-submit-button {
    margin-top: 30rpx;
  }
</style>
