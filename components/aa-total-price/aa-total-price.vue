<script setup>
  const props = defineProps({
    showTotalText: { type: Boolean, default: true },
    bold: { type: Boolean, default: false },
    startVal: { type: Number, default: 0 },
    endVal: { type: Number, default: 0},
    countTo: { type: Boolean, default: true}
  })
</script>
<template>
  <div class="aa-total-price">
    <text class="aa-font-base" v-if="showTotalText">合计</text>
    <text class="aa-font-price" style="font-size: 50rpx">￥</text>
    <u-count-to
      color="#ff5200"
      :bold="bold"
      :start-val="startVal"
      :end-val="endVal"
    />
    <text class="aa-font-base" style="margin-left: 5rpx">元</text>
  </div>
</template>

<style scoped lang="scss">
  .aa-total-price {
  }
</style>
