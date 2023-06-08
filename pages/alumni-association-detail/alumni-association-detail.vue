<script setup>
  import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
  import { useAlumniAssociationDetail } from '@/service/alumni-and-alumni-association'

  const { alumniAssociationDetail, refresh } = useAlumniAssociationDetail()

  function getShareVal() {
    const { name: title, avatar: imageUrl } = alumniAssociationDetail.value
    return {
      title,
      imageUrl
    }
  }

  onShareAppMessage(getShareVal)
  onShareTimeline(getShareVal)
  refresh()
</script>
<template>
  <div class="alumni-association-detail aa-container">
    <div class="info">
      <u-image class="info__avatar" :width="200" height="200" :src="alumniAssociationDetail.avatar" />
      <view class="info__content">
        <aa-blue-bold-name>{{ alumniAssociationDetail.name }}</aa-blue-bold-name>
        <aa-info-list :list="alumniAssociationDetail.infoList" mode="columnSpaceBetween" />
      </view>
    </div>
    <view class="name-number-list">
      <view
        class="name-number-item"
        :class="{ 'u-border-right': index !== alumniAssociationDetail.nameNumberList.length - 1 }"
        v-for="(item, index) in alumniAssociationDetail.nameNumberList"
        :key="item.name"
      >
        <view class="name-number-item__number">{{ item.number }}</view>
        <view class="name-number-item__name">{{ item.name }}</view>
      </view>
    </view>
    <view class="aa-font-paragraph-title mt-30 mb-30">简介</view>
    <view class="aa-font-paragraph">
      {{ alumniAssociationDetail.paragraph }}
    </view>
  </div>
</template>

<style scoped lang="scss">
  .alumni-association-detail {
    .info {
      display: flex;

      .info__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40rpx;
      }

      .aa-blue-bold-name {
        margin-bottom: 30rpx;
      }

      .aa-info-list {
        flex: 1;
      }
    }

    .name-number-list {
      display: flex;
      align-items: center;
      margin-top: 40rpx;
    }

    .name-number-item {
      flex: 1;
      text-align: center;
    }

    .name-number-item__name {
      color: #1b80c4;
      font-weight: 500;
    }

    .name-number-item__number {
      margin-top: 5rpx;
      color: #666;
    }
  }
</style>