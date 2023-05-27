<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import useNavigate from '@/common/hook/use-navigate'
  import { activityCancelRegistration, useAlumniActivityDetail } from '@/service/alumni-activities'
  const props = defineProps({ id: String })
  const { navigateToAlumniActivityRegistration } = useNavigate()
  const { alumniActivityDetail, refresh } = useAlumniActivityDetail(props)
  onLoad(() => {
    refresh()
  })

  function handleInfoItemEndClick(item) {
    console.log(item, 'handleInfoItemEndClick')
  }

  function share() {}

  function call() {}
  const statusTextMap = {
    1: '报名中',
    2: '在进行'
  }
  async function handleCancelRegistration() {
    const res = await activityCancelRegistration({ id: alumniActivityDetail.value.registerId, type: 2 })
    console.log(res, 'res')
    refresh()
  }
</script>
<template>
  <view class="alumni-activity-detail">
    <view class="cover">
      <u-image width="100%" height="100%" :src="alumniActivityDetail.cover" />
      <view class="cover__status">{{ statusTextMap[alumniActivityDetail.status] }}</view>
    </view>
    <view class="content">
      <view class="aa-font-title">{{ alumniActivityDetail.title }}</view>
      <aa-info-list root-class="mt-30" :list="alumniActivityDetail.infoList" @itemEndClick="handleInfoItemEndClick" />
      <view class="sub-title">活动说明</view>
      <view class="aa-font-paragraph"><u-parse :html="alumniActivityDetail.paragraph"></u-parse></view>
    </view>
    <aa-fixed-bottom>
      <template #default>
        <u-button
          type="primary"
          @click="navigateToAlumniActivityRegistration({ id: alumniActivityDetail.id })"
          v-if="!alumniActivityDetail.registered"
          >报名
        </u-button>
        <u-button type="default" @click="handleCancelRegistration" v-else>取消报名</u-button>
      </template>
    </aa-fixed-bottom>
  </view>
</template>

<style scoped lang="scss">
  .alumni-activity-detail {
    .cover {
      height: 400rpx;
      position: relative;

      .cover__status {
        position: absolute;
        top: 0;
        right: 0;
        width: 140rpx;
        height: 52rpx;
        background-color: #1b80c4ff;
        border-bottom-left-radius: 20rpx;
        line-height: 52rpx;
        text-align: center;
        color: #ffffff;
      }
    }

    .content {
      padding: 30rpx;

      .sub-title {
        margin-top: 40rpx;
        margin-bottom: 20rpx;
        font-size: 24rpx;
      }

      .aa-font-paragraph {
        margin-bottom: 120rpx;
      }
    }

    .aa-fixed-bottom {
      .bottom__share-btn,
      .bottom__call-btn {
        margin-left: 20rpx;
      }
    }
  }
</style>
