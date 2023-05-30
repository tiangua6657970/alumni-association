import { get, request } from '@/service/base'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'
import { ref } from 'vue'

export const getIndexSwiperList = params => get(paths.indexData, params)

export function useIndexSwiperList() {
  const swiperList = ref([])
  async function _getIndexSwiperList() {
    let { data } = await getIndexSwiperList()
    if (!isMock) {

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