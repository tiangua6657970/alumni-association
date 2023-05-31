<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { useDonationDetail, useDonationRecords, useExpenditureDetailList } from '@/service/donation'
  import { ref } from 'vue'
  import { navigateToDonation } from '@/common/navigates'

  const activeIndex = ref(0)
  const { donationDetail, refresh } = useDonationDetail()
  const { donationRecords, refresh: refreshDonationRecords } = useDonationRecords()
  const { expenditureDetailList, refresh: refreshExpenditureDetailList } = useExpenditureDetailList()
  onLoad(() => {
    refresh()
    refreshDonationRecords()
    refreshExpenditureDetailList()
  })
</script>
<template>
  <view class="donation-detail aa-container">
    <view class="pb-30 u-border-bottom">
      <view class="aa-font-title">{{ donationDetail.title }}</view>
      <view class="aa-font-mini mt-10">{{ donationDetail.datetime }}</view>
    </view>
    <aa-info-list root-class="ptb-30 u-border-bottom" :list="donationDetail.infoList" />
    <view class="image-list ptb-30 u-border-bottom">
      <u-image
        class="image-item"
        :src="item"
        :height="180"
        v-for="item in donationDetail.imageList"
        :key="item"
      ></u-image>
      <view class="image-item" v-if="donationDetail.imageList.length % 3 !== 0"></view>
    </view>
    <view class="ptb-30 aa-font-paragraph u-border-bottom">{{ donationDetail.paragraph }}</view>
    <view class="donation-records-wrapper aa-fix-fixed-bottom">
      <u-subsection
        active-color="#2b85e4"
        :list="[{ name: '捐款记录' }, { name: '支出明细' }]"
        v-model="activeIndex"
      ></u-subsection>
      <view class="donation-records" v-if="activeIndex === 0">
        <view class="donation-record-item u-border-bottom" v-for="item in donationRecords" :key="item.id">
          <u-avatar class="donation-record-item__left" :src="item.cover" :size="78" />
          <view class="donation-record-item__center">
            <view class="aa-font-title">{{ item.name }}</view>
            <view class="aa-font-mini mt-10">{{ item.datetime }}</view>
          </view>
          <view class="donation-record-item__right aa-font-title"> {{ item.amount }}元 </view>
        </view>
      </view>
      <view class="donation-records" v-else>
        <view class="donation-record-item u-border-bottom" v-for="item in expenditureDetailList" :key="item.id">
          <u-avatar class="donation-record-item__left" :src="item.cover" :size="78" />
          <view class="donation-record-item__center">
            <view class="aa-font-title">{{ item.name }}</view>
            <view class="aa-font-mini mt-10">{{ item.datetime }}</view>
          </view>
          <view class="donation-record-item__right aa-font-title"> {{ item.amount }}元 </view>
        </view>
      </view>
    </view>
    <aa-fixed-bottom btn-text="捐款" @btnClick="navigateToDonation" />
  </view>
</template>

<style scoped lang="scss">
  page {
    background-color: #f7f7f7;
  }
  .donation-detail {
    .image-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .image-item {
        margin-bottom: 20rpx;
        flex-basis: calc(33.333% - 13.333rpx);
      }
    }
    .donation-records-wrapper {
      box-shadow: 0 0 20rpx rgba(204, 204, 204, 0.27);
      border-radius: 12rpx;
      background-color: #fff;
    }
    .u-subsection {
      border-radius: 12rpx 12rpx 0 0 !important;
    }
    .donation-records {
      padding: 0 20rpx;
    }
    .donation-record-item {
      display: flex;
      align-items: center;
      padding: 20rpx 0;

      .donation-record-item__center {
        flex: 1;
        margin-left: 10rpx;
      }
      .donation-record-item__right {
        margin-left: 10rpx;
      }
    }
  }
</style>