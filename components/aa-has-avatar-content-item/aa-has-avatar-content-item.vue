<template>
  <view class="aa-has-avatar-content-item" :class="rootClass" @click.stop="$emit('click', data)">
    <u-avatar
      class="aa-has-avatar-content-item__avatar"
      :sex-icon="data.sex"
      :show-sex="showSex"
      :size="88"
      :src="data.avatar"
    ></u-avatar>
    <view class="aa-has-avatar-content-item__content">
      <view class="aa-has-avatar-content-item__title">{{ data.name }}</view>
      <view class="aa-has-avatar-content-item__desc">{{ data.desc }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'aa-has-avatar-content-item',
    props: {
      data: {
        type: Object,
        default: () => ({})
      },
      showSex: {
        type: Boolean,
        default: false
      },
      rootClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-has-avatar-content-item {
    display: flex;
    align-items: center;
    margin-bottom: 50rpx;
    background: #FFFFFF;
  }
  .aa-has-avatar-content-item:nth-last-child(1) {
    margin-bottom: 0;
  }
  .aa-has-avatar-content-item__content {
    flex: 1;
    margin-left: 20rpx;
  }
  .aa-has-avatar-content-item__title {
    font-size: 32rpx;
    font-weight: 500;
    color: #1a1a1a;
  }
  .aa-has-avatar-content-item__desc {
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #999999;
  }
</style>