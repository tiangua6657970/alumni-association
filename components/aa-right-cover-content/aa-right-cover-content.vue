<script>
  export default {
    name: 'aa-right-cover-content',
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<template>
  <view class="aa-right-cover-content" v-if="data.id">
    <view class="content">
      <view class="u-line-1 aa-font-title">{{ data.title }}</view>
      <view class="aa-font-desc u-line-2">
        {{ data.paragraph }}
      </view>
      <view class="content-bottom text-line-1 aa-font-mini">{{ data.datetime }}</view>
    </view>
    <u-image :src="data.cover" :width="220" :height="180" />
  </view>
</template>

<style scoped lang="scss">
.aa-right-cover-content {
  display: flex;
  background-color: #fff;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20rpx;
}
.content-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
