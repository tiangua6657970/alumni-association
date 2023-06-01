<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import { navigateToAlumniActivityRegistration } from '@/common/navigates'
  import { activityCancelRegistration, useAlumniActivityDetail } from '@/service/alumni-activities'

  const props = defineProps({ id: String })
  const { alumniActivityDetail, refresh } = useAlumniActivityDetail(props)
  refresh()
  // onLoad(() => {
  //   refresh()
  // })

  function handleInfoItemEndClick(item) {
    console.log(item, 'handleInfoItemEndClick')
  }

  function share() {}

  function call() {}

  async function handleCancelRegistration() {
    const res = await activityCancelRegistration({ id: alumniActivityDetail.value.registerId, type: 2 })
    console.log(res, 'res')
    refresh()
  }
</script>
<template>
  <view class="alumni-activity-detail" v-if="alumniActivityDetail.id">
    <view class="cover">
      <u-image width="100%" height="100%" :src="alumniActivityDetail.cover" />
      <view class="cover__status">{{ alumniActivityDetail.statusText }}</view>
    </view>
    <view class="aa-container">
      <view class="aa-font-title">{{ alumniActivityDetail.title }}</view>
      <aa-info-list
        root-class="mt-30"
        :list="alumniActivityDetail.infoList"
        @itemEndClick="handleInfoItemEndClick"
      />
      <view class="mtb-30 aa-font-desc">活动说明</view>
      <view class="aa-font-paragraph">{{ alumniActivityDetail.paragraph }}</view>
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

    .aa-font-paragraph {
      margin-bottom: 120rpx;
    }

    .aa-fixed-bottom {
      .bottom__share-btn,
      .bottom__call-btn {
        margin-left: 20rpx;
      }
    }
  }
</style>
