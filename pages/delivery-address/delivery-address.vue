<script setup>
  import { navigateTo, navigateToAddDeliveryAddress, pathMap } from '@/common/navigates'
  import { ref } from 'vue'
  import { deliveryAddressListStore } from '@/stores/personal-center'

  const props = defineProps({ selectShow: { type: String } })
  const selectShow = ref(false)
  selectShow.value = props.showSelect
  function add() {}

  function handleSelect(item) {
    deliveryAddressListStore.value.forEach(item => (item.selected = false))
    item.selected = !item.selected
  }

  function handleChange(index) {
    deliveryAddressListStore.value.forEach((item, _index) => (item.selected = _index === index))
  }

  function handleEditItem(item) {}
</script>
<template>
  <view class="delivery-address aa-container">
    <view class="delivery-address-list aa-fix-fixed-bottom-btn" v-if="deliveryAddressListStore.length">
      <view class="delivery-address-item" v-for="(item, index) in deliveryAddressListStore" :key="item.id">
        <view class="delivery-address-item__header">
          <view class="delivery-address-item__header__left">
            <text class="delivery-address-item__header__name aa-font-title">{{ item.receiverName }}</text>
            <text class="delivery-address-item__header__phone aa-font-title">{{ item.receiverPhone }}</text>
            <text class="delivery-address-item__header__default" v-if="item.isDefault">默认</text>
          </view>
          <view class="delivery-address-item__header__right">
            <u-checkbox
              class="delivery-address-item__header__select"
              :name="index"
              :size="30"
              :label-size="0"
              shape="circle"
              :model-value="item.selected"
              @update:modelValue="handleChange(index)"
              v-if="selectShow"
            />
            <u-icon
              class="delivery-address-item__header__edit"
              custom-prefix="custom-icon"
              name="edit"
              size="36"
              @click="navigateToAddDeliveryAddress({ id: item.id, edit: true })"
            ></u-icon>
            <u-icon
              class="delivery-address-item__header__delete"
              custom-prefix="custom-icon"
              name="delete"
              size="36"
            ></u-icon>
          </view>
        </view>
        <view class="aa-font-desc">{{ item.shippingAddress }}</view>
      </view>
    </view>
    <aa-empty mode="list" :show="!deliveryAddressListStore.length" />
    <aa-fixed-bottom-right @click="navigateTo(pathMap.addDeliveryAddress)">
      <template #default>
        <u-icon name="plus" :size="40" />
      </template>
    </aa-fixed-bottom-right>
  </view>
</template>

<style scoped lang="scss">
  .delivery-address {
    .delivery-address-list {
    }
    .delivery-address-item {
      background-color: #f7f7f7;
      padding: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 8rpx;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
    .delivery-address-item__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .delivery-address-item__header__right {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
    }
    .delivery-address-item__header__phone,
    .delivery-address-item__header__default,
    .delivery-address-item__header__delete,
    .delivery-address-item__header__edit {
      margin-left: 20rpx;
    }
    .delivery-address-item__header__default {
      color: #2b85e4;
    }
    :deep(.u-checkbox__label) {
      margin: 0;
    }
  }
</style>