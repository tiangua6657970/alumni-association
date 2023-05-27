<script setup>
  import useNavigate from '@/common/hook/use-navigate'

  const { pathMap, navigateTo } = useNavigate()
  const navList = [
    { content: '个人信息', path: pathMap.editProfile },
    { content: '变更认证', path: '' },
    { content: '收货地址', path: pathMap.deliveryAddress },
    { content: '修改密码', path: pathMap.forgotPassword }
  ]
  function handleItemClick(item) {
    navigateTo(item.path)
  }
</script>
<template>
  <view class="settings aa-container">
    <aa-nav-list
      :list="navList"
      :item-style="{ marginBottom: '20rpx', background: '#f7f7f7' }"
      @itemClick="handleItemClick"
    />
    <aa-submit-button>退出登录</aa-submit-button>
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
