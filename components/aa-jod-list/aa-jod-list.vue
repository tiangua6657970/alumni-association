<template>
  <view class="aa-jod-list">
    <view class="aa-jod-item aa-container" v-for="item in list" :key="item.id" @click="$emit('itemClick', item)">
      <view class="aa-jod-item__left">
        <view class="aa-jod-item__title aa-font-title">{{ item.title }}</view>
        <view class="aa-jod-item__info aa-font-base">
          <view class="info-item">
            <u-icon name="map" size=24 :label="item.city" :label-size="24" color="#2b85e4"></u-icon>
          </view>
          <view class="info-item">
            <u-icon
              custom-prefix="custom-icon"
              name="workYears"
              :label="item.workYears"
              :label-size="24"
              size=24
              color="#2b85e4"
            ></u-icon>
          </view>
          <view class="info-item">
            <u-icon
              custom-prefix="custom-icon"
              name="education"
              size=24
              :label="item.education"
              :label-size="24"
              color="#2b85e4"
            ></u-icon>
          </view>
        </view>
      </view>
      <aa-blue-bold-name>
        {{ item.salary }}
      </aa-blue-bold-name>
      <view class="aa-jod-item__right"> </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'aa-jod-list',
    emits: ['itemClick'],
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">
  .aa-jod-list {
    .aa-jod-item {
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      background-color: #fff;
    }
    .aa-jod-item__left {
      flex: 1;
    }
    .aa-jod-item__info {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
    }
    .info-item {
      margin-right: 30rpx;
    }
  }
</style>
