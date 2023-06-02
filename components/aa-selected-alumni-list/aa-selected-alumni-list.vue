<template>
  <view class="aa-selected-alumni-list" :class="rootClass">
    <u-avatar
      class="selected-alumni-item"
      :sex-icon="item.sex"
      :size="70"
      show-sex
      :src="item.avatar"
      v-for="item in list"
      :key="item.id"
    ></u-avatar>
  </view>
</template>

<script>
  export default {
    name: 'aa-selected-alumni-list',
    props: {
      list: {
        type: Array,
        default: () => []
      },
      rootClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-selected-alumni-list {
    display: flex;
    align-items: center;
    .selected-alumni-item  {
      margin-left: 20rpx;
    }
  }
</style>