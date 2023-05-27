<script>
  export default {
    name: 'aa-swiper',
    emits: ['itemClick'],
    props: {
      list: {
        type: Array,
        default: () => []
      },
      height: {
        type: [String, Number],
        default: 400
      }
    }
  }
</script>
<template>
  <view class="aa-swiper">
    <u-swiper :list="list" :height="height" :indicator="{}" indicatorMode="dot" circular @click="$emit('itemClick', $event)"></u-swiper>
  </view>
</template>
<style scoped lang="scss">
  .aa-swiper {
    //height: 100%;
  }
</style>
