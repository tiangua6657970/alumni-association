<script setup>
  import { pathMap, navigateTo } from '@/common/navigates'
  import { __TOKEN__ } from '@/common/keys'

  const navList = [
    { content: '个人信息', path: pathMap.editProfile },
    { content: '变更认证', path: '' },
    { content: '收货地址', path: pathMap.deliveryAddress },
    { content: '修改密码', path: pathMap.forgotPassword }
  ]
  function handleItemClick(item) {
    navigateTo(item.path)
  }

  function handleLogout() {
    uni.setStorageSync(__TOKEN__, null)
    uni.reLaunch({
      url: pathMap.index
    })
  }
</script>
<template>
  <view class="settings aa-container">
    <aa-nav-list
      :list="navList"
      :item-style="{ marginBottom: '20rpx', background: '#f7f7f7' }"
      @itemClick="handleItemClick"
    />
    <aa-submit-button @click="handleLogout">退出登录</aa-submit-button>
  </view>
</template>

<style scoped lang="scss">
  page {
    background-color: #fff;
  }
  .settings {
  }
  .aa-nav-list {
  }
  .aa-submit-button {
    position: absolute;
    left: 96rpx;
    right: 96rpx;
    bottom: 96rpx;
  }
</style>