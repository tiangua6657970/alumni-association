<script setup>
  import { onLoad, onShow } from '@dcloudio/uni-app'
  import useNavigate from '@/common/hook/use-navigate'
  import usePersonalCenterStore from '@/stores/personal-center'
  import { ref } from 'vue'
  const { navigateTo, pathMap } = useNavigate()
  const { storeData } = usePersonalCenterStore()
  onLoad(() => {})

  const actionList = [
    { icon: 'custom-icon-activities', content: '我的活动', path: pathMap.myActivities },
    { icon: 'custom-icon-supplyAndDemand', content: '我的供需', path: pathMap.mySupplyAndDemand },
    { icon: 'red-packet-fill', content: '支付记录', path: pathMap.paymentRecords },
    { icon: 'custom-icon-order', content: '我的订单', path: pathMap.myOrders },
    { icon: 'custom-icon-privacy', content: '隐私', path: pathMap.privacy },
    { icon: 'custom-icon-feedback', content: '建议反馈', path: pathMap.suggestionsAndFeedback },
    { icon: 'custom-icon-setting', content: '设置', path: pathMap.settings }
  ]
  const marginTop = ref(0)

  function handleEditProfile() {
    navigateTo(pathMap.editProfile)
  }
  const background = {
    background: 'transparent'
  }
</script>
<template>
  <div class="profile">
    <aa-top-background
      :height="400"
      navbar-title="个人中心"
      :is-back="false"
      @updateRenderHeight="marginTop = $event"
    >
    </aa-top-background>
    <view class="aa-container" :style="{ marginTop: marginTop + 'px' }">
      <view class="content">
        <view class="info">
          <u-avatar :size="200" :src="storeData.avatar" :show-sex="storeData.sex" />
          <aa-blue-bold-name>{{ storeData.name }}</aa-blue-bold-name>
          <view class="aa-font-desc">{{ storeData.desc }}</view>
          <view class="edit-profile" @click="handleEditProfile">
            <text class="edit-profile__text">编辑资料</text>
            <u-icon class="edit-profile__icon" :size="30" color="#fff" name="map" />
          </view>
        </view>
        <view class="action-list">
          <view
            class="action-item"
            :class="{ 'u-border-bottom': index !== actionList.length - 1 }"
            v-for="(item, index) in actionList"
            :key="item.content"
            @click="navigateTo(item.path)"
          >
            <u-icon class="action-item__left-icon" :size="30" color="#1287d2FF" :name="item.icon"></u-icon>
            <text class="action-item__content aa-font-title">{{ item.content }}</text>
            <u-icon class="action-item__right-icon" :size="30" color="#999" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<style scoped lang="scss">
  .profile {
    .aa-container {
      margin-top: 312rpx;
      border-top-left-radius: 100rpx;
      border-top-right-radius: 100rpx;
      position: relative;
      top: -100rpx;
      background-color: #f7f7f7;
    }

    .action-list {
      margin-top: 80rpx;
      border-radius: 8rpx;
      padding: 30rpx;
      background-color: #fff;
    }

    .action-item {
      display: flex;
      align-items: center;
      padding: 20rpx 0;

      .action-item__content {
        flex: 1;
        margin-left: 20rpx;
      }

      .action-item__right-icon {
      }
    }

    .content {
      position: relative;
      top: -130rpx;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;

      .aa-blue-bold-name {
        margin: 10rpx 0;
      }

      .edit-profile {
        position: absolute;
        top: 0;
        right: 0;
        color: #ffffff;
      }

      .edit-profile__icon {
        margin-left: 8rpx;
      }
    }
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>
