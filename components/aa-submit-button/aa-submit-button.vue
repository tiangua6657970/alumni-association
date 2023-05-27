<template>
  <view class="aa-submit-button">
    <u-button class="aa-button" type="primary" @click="$emit('click')"><slot>按钮</slot></u-button>
  </view>
</template>

<script>
  export default {
    name: 'aa-submit-button',
    emits: ['click']
  }
</script>

<style scoped lang="scss">
  .aa-submit-button {
    display: flex;
    justify-content: center;
    .aa-button {
      width: 76.666666%;
    }
  }
</style>