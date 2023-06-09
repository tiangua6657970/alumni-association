<script setup>
  import {
    currentAddress,
    currentAddressLine,
    locationStore,
    positionStatusText,
    refreshLocation
  } from '@/stores/location'

  defineProps({ modelValue: { type: Boolean, default: false } })
  const emit = defineEmits(['update:modelValue', 'confirm'])

  function handleConfirm() {
    emit('confirm', {
      currentAddress: currentAddress.value,
      currentAddressLine: currentAddressLine.value,
      locationStore
    })
    emit('update:modelValue', false)
  }
</script>

<template>
  <u-popup :model-value="modelValue" mode="bottom" @update:model-value="emit('update:modelValue', $event)">
    <view class="location-selection">
      <view class="location-selection-item">
        <view class="aa-font-desc">使用当前定位：</view>
        <view class="aa-font-desc-light">{{ currentAddress }}</view>
      </view>
      <view class="location-selection-item mt-30">
        <u-button size="mini" type="primary" @click="handleConfirm">确定</u-button>
        <u-button class="ml-20" size="mini" type="primary" @click="refreshLocation"
          >{{ positionStatusText }}
        </u-button>
      </view>
    </view>
  </u-popup>
</template>

<style scoped lang="scss">
  .location-selection {
    height: 500rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .location-selection-item {
      display: flex;
      align-items: center;
    }
  }
</style>
