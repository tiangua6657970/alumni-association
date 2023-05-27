<template>
  <view class="aa-select-tab" :class="customClass">
    <view class="select-tab-item" v-for="item in list" :key="item.name" @click="$emit('itemClick', item)">
      <text class="select-tab-item__label">{{ item.name }}</text>
      <u-icon class="select-tab-item__icon" name="arrow-down"></u-icon>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'aa-select-tab',
    emits: ['itemClick'],
    props: {
      list: {
        type: Array,
        default: () => []
      },
      customClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-select-tab {
    display: flex;
    align-items: center;
  
    .select-tab-item {
      margin-right: 80rpx;
    }
  }
</style>