<script>
  export default {
    name: 'alumni-company-list',
    emits: ['itemClick', 'moreClick'],
    props: {
      list: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      },
      showTop: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<template>
  <view class="alumni-company-list" v-if="list.length">
    <view
      class="alumni-company-item u-border-bottom"
      :class="{ 'pt-0': !showTop && !index }"
      v-for="(item, index) in list"
      :key="item.id"
      @click="$emit('itemClick', item)"
    >
      <u-image class="alumni-company__avatar" :width="88" :height="88" shape="circle" :src="item.avatar" />
      <view class="alumni-company__content">
        <view class="alumni-company__title aa-font-title">{{ item.title }}</view>
        <view class="alumni-company__desc aa-font-desc">{{ item.desc }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .alumni-company-list {
    background-color: #ffffff;
    padding: 30rpx 30rpx 0 30rpx;
    .alumni-company-item {
      display: flex;
      padding: 22rpx 0;
    }
    .alumni-company__content {
      flex: 1;
      margin-left: 18rpx;
    }
    .alumni-company__title {
    }
    .alumni-company__desc {
      margin-top: 8rpx;
    }
  }
</style>
