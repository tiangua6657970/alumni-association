<template>
  <div class="aa-container">
    <view class="aa-font-title">{{ data.title }}</view>
    <view class="aa-font-mini mt-20">
      <text>{{ data.datetime }}</text>
      <text class="ml-20">{{data.publisher}}</text>
    </view>
    <view class="aa-font-paragraph mt-30">{{ data.paragraph }}</view>
  </div>
</template>

<script>
  export default {
    name: 'aa-dynamic-detail',
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-dynamic-detail {
  }
</style>