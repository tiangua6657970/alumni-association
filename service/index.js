import { get } from '@/service/base'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'
import { ref } from 'vue'

export const getIndexSwiperList = params => get(paths.indexData, params)


function mapSwiper(data) {
  const { title, image, routeName, id} = data
  return {
    title,image,routeName, id
  }
}
export function useIndexSwiperList() {
  const swiperList = ref([])
  async function _getIndexSwiperList() {
    let { data } = await getIndexSwiperList()
    if (!isMock) {
      data = data.map(item => mapSwiper(item))
    }
    return data
  }
  async function refresh() {
     swiperList.value = await _getIndexSwiperList()
  }
  return {
    swiperList,
    refresh
  }
}