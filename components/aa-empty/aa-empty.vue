<template>
  <view class="aa-empty" v-if="show" :style="{top: top + 'rpx'}">
    <u-empty :mode="mode"></u-empty>
  </view>
</template>

<script>
  export default {
    name: 'aa-empty',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      top: {
        type: Number,
        default: 0
      },
      mode: {
        type: String,
        default: 'list'
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-empty {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>