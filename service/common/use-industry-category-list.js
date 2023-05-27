import { get } from '@/service/base'
import { ref } from 'vue'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'
export const getIndustryCategoryList = params => get(paths.industryCategoryList, params)

export default function useIndustryCategoryList() {
  const industryCategoryList = ref([])

  function removeEmptyChildren(node) {
    node.forEach(item => {
      if ('children' in item && item.children.length === 0) {
        delete item.children
      } else if ('children' in item && item.children.length) {
        removeEmptyChildren(item.children)
      }
    })
    return node
  }

  async function _getIndustryCategoryList() {
    const { data } = await getIndustryCategoryList()
    if (!isMock) {
      return data.list
    }
    return []
  }

  async function refresh() {
    const res = await _getIndustryCategoryList()
    industryCategoryList.value = removeEmptyChildren(res)
  }

  return {
    industryCategoryList,
    refresh
  }
}