<template>
  <view class="aa-delivery-address-item" @click="$emit('click')" :style="{ background: bgColor }">
    <view class="aa-delivery-address-item__header">
      <view class="aa-delivery-address-item__header__left">
        <text class="aa-delivery-address-item__header__name aa-font-title">{{ data.receiverName }}</text>
        <text class="aa-delivery-address-item__header__phone aa-font-title">{{ data.receiverPhone }}</text>
        <text class="aa-delivery-address-item__header__default" v-if="data.isDefault">默认</text>
      </view>
      <view class="aa-delivery-address-item__header__right">
        <u-icon
          class="aa-delivery-address-item__header__edit"
          name="edit-pen"
          size="36"
          v-if="actionMode === 'editDelete'"
        ></u-icon>
        <u-icon
          class="aa-delivery-address-item__header__delete"
          name="trash"
          size="36"
          v-if="actionMode === 'editDelete'"
        ></u-icon>
        <u-icon
          class="aa-delivery-address-item__header__to-select"
          :size="36"
          color="#999"
          name="arrow-right"
          v-if="actionMode === 'select'"
        ></u-icon>
      </view>
    </view>
    <view class="aa-font-desc">{{ data.shippingAddress }}</view>
  </view>
</template>

<script>
  export default {
    name: 'aa-delivery-address-item',
    emits: ['click'],
    props: {
      data: {
        type: Object,
        default: () => ({})
      },
      actionMode: {
        type: String,
        default: 'editDelete' // select
      },
      bgColor: {
        type: String,
        default: '#f7f7f7'
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-delivery-address-item {
  }
  .aa-delivery-address-item {
    padding: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 8rpx;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
  .aa-delivery-address-item__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .aa-delivery-address-item__header__right {
    margin-top: 20rpx;
  }
  .aa-delivery-address-item__header__phone,
  .aa-delivery-address-item__header__default,
  .aa-delivery-address-item__header__delete {
    margin-left: 20rpx;
  }
  .aa-delivery-address-item__header__default {
    color: #2b85e4;
  }
</style>
