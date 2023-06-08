<script setup>
  import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
  import { useDynamicDetail } from '@/service/dynamic'

  const props = defineProps({ id: String, navigationBarTitle: String })
  const { dynamicDetail, refresh } = useDynamicDetail(props)
  uni.setNavigationBarTitle({ title: props.navigationBarTitle })

  function getShareVal() {
    const { title, cover: imageUrl } = dynamicDetail.value
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
  <view class="dynamic-detail">
    <aa-dynamic-detail :data="dynamicDetail" />
  </view>
</template>

<style scoped lang="scss"></style>