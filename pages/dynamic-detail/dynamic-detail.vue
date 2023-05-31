<script setup>
  import { useDynamicDetail } from '@/service/dynamic'
  import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
  import { getCurrentPath } from "@/common/utils";

  const props = defineProps({ id: String, navigationBarTitle: String })
  const { dynamicDetail, refresh } = useDynamicDetail(props)
  uni.setNavigationBarTitle({ title: props.navigationBarTitle })
  onLoad(async () => {
    const { title, publisher: desc, cover: imageUrl, id } = await refresh()
    const shareVal = {
      path: getCurrentPath(),
      title,
      desc,
      imageUrl
    }
    onShareAppMessage(shareVal)
    onShareTimeline(shareVal)
  })
</script>
<template>
  <view class="dynamic-detail">
    <aa-dynamic-detail :data="dynamicDetail" />
  </view>
</template>

<style scoped lang="scss"></style>