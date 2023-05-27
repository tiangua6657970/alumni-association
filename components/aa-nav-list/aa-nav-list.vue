<template>
  <view class="aa-nav-list">
    <view
      class="aa-nav-item"
      :style="itemStyle"
      v-for="(item, index) in list"
      :key="item.content"
      :class="{ 'u-border-bottom': index !== list.length - 1 }"
      @click="$emit('itemClick', item)"
    >
      <u-icon
        class="aa-nav-item__left-icon"
        :size="36"
        color="#1287d2FF"
        :name="item.icon"
        v-if="item.icon"
      ></u-icon>
      <text class="aa-nav-item__content aa-font-desc" :style="{marginLeft: item.icon ? '20rpx': 0}">{{ item.content }}</text>
      <u-icon class="aa-nav-item__right-icon" :size="36" color="#999" name="arrow-right"></u-icon>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'aa-nav-list',
    emits: ['itemClick'],
    props: {
      list: {
        type: Array,
        default: () => []
      },
      itemStyle: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-nav-list {
    border-radius: 8rpx;
    .aa-nav-item {
      display: flex;
      align-items: center;
      padding: 20rpx;
      border-radius: 8rpx;
    }
    .aa-nav-item__left-icon {
    }
    .aa-nav-item__content {
      flex: 1;
      margin-left: 20rpx;
    }
    .aa-nav-item__right-icon {
    }
  }
</style>
