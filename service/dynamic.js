import { get } from '@/service/base'
import { reactive, ref, watchEffect } from 'vue'
import useLoadMore from '@/common/hook/useLoadMore'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'
export const getDynamicListCategoryList = params => get(paths.dynamicListCategoryList, params)
export const getDynamicList = params => get(paths.dynamicList, params)
export const getDynamicDetail = params => get(paths.dynamicDetail, params)

export function useDynamicListCategoryList() {
  const dynamicListCategoryList = ref([])

  async function _getDynamicListCategoryList(arg = {}) {
    const { data } = await getDynamicListCategoryList()
    return data.list.children
  }

  async function refresh() {
    return (dynamicListCategoryList.value = await _getDynamicListCategoryList())
  }

  return {
    dynamicListCategoryList,
    refresh
  }
}

function mapDynamic(data) {
  const { title, cover, updatedAt: datetime, content: paragraph, id } = data
  return { title, cover, datetime: datetime.slice(0, -3), paragraph, id }
}

export function useDynamicList() {
  const { loadResult, loadStatus, noData, refresh: refreshDynamicList, loadMore } = useLoadMore(_getDynamicList)
  const _params = ref({})

  async function _getDynamicList(arg = {}) {
    let { data } = await getDynamicList({ ..._params.value, ...arg })
    if (!isMock) {
      data = data.list.map(item => mapDynamic(item))
    }
    return data
  }

  function setParams(params) {
    _params.value = params
  }

  async function refresh() {
    await refreshDynamicList()
  }

  return {
    dynamicList: loadResult,
    setParams,
    loadStatus,
    noData,
    refresh,
    loadMore
  }
}

export function useDynamicDetail(props) {
  const dynamicDetail = reactive({
    title: '',
    cover: '',
    datetime: '',
    paragraph: ''
  })

  async function _getDynamicDetail() {
    let { data } = await getDynamicDetail({ id: props.id })
    if (!isMock) {
      return mapDynamic(data)
    }
    return data
  }

  async function refresh() {
    const { title, cover, datetime, paragraph } = await _getDynamicDetail()
    dynamicDetail.title = title
    dynamicDetail.cover = cover
    dynamicDetail.datetime = datetime
    dynamicDetail.paragraph = paragraph
  }

  return {
    dynamicDetail,
    refresh
  }
}
