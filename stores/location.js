import { reactive } from 'vue'
import amap from '@/common/amap-wx.130'

export const locationStore = reactive({})
export function getLocation() {
  const aMap = new amap.AMapWX({
    key: '20ae46e916db10f768635c6377ae3585'
  })
  aMap.getRegeo({
    success: res => {
      console.log('aMap.getRegeo', res)
    },
    fail: err => {
      uni.showToast({ title: '获取位置失败，请重启小程序', icon: 'error'})
      console.log('aMap.getRegeo', err)
    }
  })
}
