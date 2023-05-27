<script setup>
  import { getCurrentInstance, nextTick, onMounted } from 'vue'
  
  const instance = getCurrentInstance()
  const props = defineProps({
    height: { type: Number, default: 300 },
    isBack: { type: Boolean, default: true },
    backText: { type: String, default: '返回' },
    navbarBorderBottom: { type: Boolean, default: false },
    navbarTitle: { type: String, default: '导航栏标题' },
    navbarTitleColor: { type: String, default: '#fff' },
    backTextStyle: { type: Object, default: { color: '#fff' } },
    backIconColor: { type: String, default: '#fff' },
    navbarBackground: { type: Object, default: () => ({ background: 'transparent' }) }
  })
  const emit = defineEmits(['updateRenderHeight'])
  onMounted(() => {
    let statusBarHeight = 0
    const query = uni.createSelectorQuery().in(instance)
    query.select('#root').boundingClientRect(result => {
      statusBarHeight = result.height
    }).exec()
    query.select('#bg-content').boundingClientRect(result => {
      emit('updateRenderHeight', result.height - statusBarHeight )
    }).exec()
  })

</script>
<template>
  <view class="aa-top-background" id="root">
    <u-navbar
      :is-back="isBack"
      :back-text="backText"
      :border-bottom="navbarBorderBottom"
      :background="navbarBackground"
      :title="navbarTitle"
      :title-color="navbarTitleColor"
      :back-text-style="backTextStyle"
      :back-icon-color="backIconColor"
    >
      <template #default>
        <slot name="navbar-content"></slot>
      </template>
    </u-navbar>
    <view class="top-background" id="bg-content" :style="{ height: height + 'rpx' }">
      <slot></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
  .top-background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 300rpx;
    background-image: linear-gradient(45deg, rgba(18, 118, 198, 1), rgb(136, 163, 255));
  }
</style>
