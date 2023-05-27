<template>
  <view class="aa-fixed-bottom-right" @click="$emit('click', $event)">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: 'aa-fixed-bottom-right',
    emits: ['click']
  }
</script>

<style scoped lang="scss">
  .aa-fixed-bottom-right {
    position: fixed;
    right: 50rpx;
    width: 80rpx;
    height: 80rpx;
    bottom: 200rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #2b85e4;
    color: #ffffff;
  }
</style>