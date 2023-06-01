<script>
  export default {
    name: 'aa-left-cover-content',
    props: {
      data: {
        type: Object,
        default: () => ({})
      },
      showStatus: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<template>
  <view class="aa-left-cover-content" v-if="data.id">
    <u-image :src="data.cover" :width="220" :height="180" />
    <view class="content">
      <view class="text-line-1 aa-font-title">{{ data.title }}</view>
      <view class="aa-font-desc u-line-2">
        {{ data.paragraph }}
      </view>
      <view class="content-bottom">
        <view class="content-bottom__date text-line-1 aa-font-mini">{{ data.datetime }}</view>
        <view class="content-bottom__status" :class="`status--${data.status}`" v-if="showStatus"
          >{{ data.statusText }}
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .aa-left-cover-content {
    display: flex;
    background-color: #fff;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
  }

  .content-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content-bottom__status {
    flex-shrink: 0;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 48rpx;
    border-radius: 24rpx;
    padding: 0 25rpx;

    &.status--1 {
      background-color: #1b80c4;
    }

    &.status--2 {
      background-color: #00c777;
    }
  }
</style>