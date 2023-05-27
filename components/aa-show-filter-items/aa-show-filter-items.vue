<template>
  <view class="aa-show-filter-items aa-font-desc-light" :class="customClass" v-if="Object.keys(items).length">
    <u-icon
      class="show-filter-item"
      name="close-circle"
      :label="value"
      label-pos="left"
      label-color="#2b85e4"
      size="30"
      :key="key"
      v-for="(value, key) in items"
      @click="$emit('itemClick', key)"
    />
  </view>
</template>

<script>
  export default {
    name: 'aa-show-filter-items',
    emits: ['itemClick'],
    props: {
      items: {
        type: Object,
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-show-filter-items {
    margin-top: 30rpx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .show-filter-item {
      margin-right: 15rpx;
    }
  }
</style>
