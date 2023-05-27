import { reactive } from 'vue'

export const systemInfo = reactive({
  topBarHeight: 88
})

export function refreshSystemInfo() {
  const { statusBarHeight } = uni.getSystemInfoSync()

  // #ifdef MP-WEIXIN
  // 获取微信胶囊的位置信息 width,height,top,right,left,bottom
  const custom = wx.getMenuButtonBoundingClientRect()

  // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
  const navigationBarHeight = custom.height + (custom.top - statusBarHeight) * 2

  // 总体高度 = 状态栏高度 + 导航栏高度
  systemInfo.topBarHeight = navigationBarHeight + statusBarHeight
  console.log(systemInfo.topBarHeight,'systemInfo.topBarHeight')
  // #endif
}