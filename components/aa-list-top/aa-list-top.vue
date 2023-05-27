<template>
  <view class="aa-list-top p-30">
    <view class="title">{{ title }}</view>
    <view class="more" @click="$emit('moreClick')">
      <text class="more__text">更多</text>
      <u-icon class="more__icon" name="arrow-right" color="#999999" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'aa-list-top',
    emits: ['moreClick'],
    props: {
      title: {
        type: String,
        default: '标题'
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-list-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    
    .title {
      font-size: 40rpx;
      line-height: 45rpx;
      font-weight: 500;
      color: #1b80c4;
    }
  
    .more {
      color: #999999;
    }
  }
</style>