<template>
  <u-button class="aa-primary-btn" type="primary" @click="$emit('click')">
    <slot></slot>
  </u-button>
</template>

<script>
  export default {
    name: 'aa-primary-btn',
    emits: ['click'],
  }
</script>

<style scoped lang="scss">
  .aa-primary-btn {
    position: fixed;
    left: 96rpx;
    right: 96rpx;
    bottom: 96rpx;
  }
</style>