<script setup>
  import { useDynamicDetail } from '@/service/dynamic'
  import { onLoad } from '@dcloudio/uni-app'
  
  const props = defineProps({ id: String, navigationBarTitle: String })
  const { dynamicDetail, refresh } = useDynamicDetail(props)
  uni.setNavigationBarTitle({title: props.navigationBarTitle})
  onLoad(async () => {
    refresh()
  })
</script>
<template>
  <view class="dynamic-detail">
    <aa-dynamic-detail :data="dynamicDetail" />
  </view>
</template>

<style scoped lang="scss">
</style>
