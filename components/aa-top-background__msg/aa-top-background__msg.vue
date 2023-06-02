<script setup>
  import { currentAlumniAssociation } from '@/stores/location'
</script>
<template>
  <view class="aa-top-background__msg">
    <text>{{ currentAlumniAssociation }}</text>
  </view>
</template>

<style scoped lang="scss">
  .aa-top-background__msg {
    position: absolute;
    left: 30rpx;
    right: 30rpx;
    bottom: 40rpx;
    color: #ffffff;
  }
</style>
