<script setup>
  import { currentAlumniAssociation, refreshLocation } from '@/stores/location'
  defineProps({ isSearch: { type: Boolean, default: false } })
  const emit = defineEmits(['searchClick','textClick'])
</script>
<template>
  <view class="aa-top-background__msg">
    <u-icon
      :size="36"
      name="search"
      color="#fff"
      label-color="#fff"
      :label="currentAlumniAssociation"
      @click="$emit('searchClick')"
      v-if="isSearch"
    />
    <text v-else @click="$emit('textClick')">{{ currentAlumniAssociation }}</text>
    <u-icon name="map" color="#fff" label="定位" label-color="#fff" @click="refreshLocation" />
  </view>
</template>

<style scoped lang="scss">
  .aa-top-background__msg {
    position: absolute;
    left: 30rpx;
    right: 30rpx;
    bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
  }
</style>