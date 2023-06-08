import { computed, reactive, ref } from 'vue'
import amap from '@/common/amap-wx.130'

export const locationStore = reactive({
  // 如："南宁市西乡塘区衡阳西路11号"
  name: '',
  // 如：南宁市西乡塘区人民政府附近
  desc: '',
  // 纬度
  latitude: '',
  // 经度
  longitude: '',
  // 国
  country: '',
  // 省
  province: '',
  // 市
  city: '',
  citycode: '',
  // 区
  district: ''
})

export const currentAddress = computed(() => {
  const { province, city, district } = locationStore
  return `${province}-${city}-${district}`
})

export const positionStatus = ref('reposition') // reposition | positioning | positionErr
const positionStatusTextMap = {
  reposition: '重新定位',
  positioning: '正在定位',
  positionErr: '定位出错了'
}
export const positionStatusText = computed(() => positionStatusTextMap[positionStatus.value])

export const currentAlumniAssociation = computed(() => {
  if (positionStatus.value === 'positioning') {
    return positionStatusTextMap[positionStatus.value]
  }
  return `桂电校友会-${locationStore.city}`
})

export function refreshLocation() {
  positionStatus.value = 'positioning'
  const aMap = new amap.AMapWX({
    key: '20ae46e916db10f768635c6377ae3585'
  })
  aMap.getRegeo({
    success: res => {
      positionStatus.value = 'reposition'
      const [regeo] = res
      const {
        name,
        desc,
        latitude,
        longitude,
        regeocodeData: { addressComponent }
      } = regeo
      const { country, province, city, citycode, district } = addressComponent
      locationStore.name = name
      locationStore.desc = desc
      locationStore.latitude = latitude
      locationStore.longitude = longitude
      locationStore.country = country
      locationStore.province = province
      locationStore.city = city
      locationStore.citycode = citycode
      locationStore.district = district
    },
    fail: err => {
      positionStatus.value = 'positionErr'
      uni.$u.toast('获取地理位置失败，可重启小程序')
      console.log('aMap.getRegeo', err)
    }
  })
}
