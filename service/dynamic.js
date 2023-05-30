import { get } from '@/service/base'
import { reactive, ref, watchEffect } from 'vue'
import useLoadMore from '@/common/hook/useLoadMore'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'
import useSearch from '@/common/hook/use-search'

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
    if (!isMock) {
      return (dynamicListCategoryList.value = await _getDynamicListCategoryList())
    } else {
      return dynamicListCategoryList.value =  [
        { name: '母校新闻', id: '1' },
        { name: '校友动态', id: '2' },
        { name: '校友故事', id: '3' },
        { name: '通知公告', id: '4' }
      ]
    }
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
  const {
    searchResult,
    loadStatus,
    noData,
    refresh,
    loadMore,
    setParamsAndRefresh
  } = useSearch(_getDynamicList)
  const _params = ref({})

  async function _getDynamicList(arg = {}) {
    let { data } = await getDynamicList({ ..._params.value, ...arg })
    if (!isMock) {
      data = data.list.map(item => mapDynamic(item))
    }
    return data
  }

  return {
    dynamicList: searchResult,
    setParamsAndRefresh,
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
    paragraph: '',
    publisher: ''
  })

  async function _getDynamicDetail() {
    let { data } = await getDynamicDetail({ id: props.id })
    if (!isMock) {
      return mapDynamic(data)
    }
    return data
  }

  async function refresh() {
    const { title, cover, datetime, paragraph, publisher } = await _getDynamicDetail()
    dynamicDetail.title = title
    dynamicDetail.cover = cover
    dynamicDetail.datetime = datetime
    dynamicDetail.paragraph = paragraph
    dynamicDetail.publisher = publisher
  }

  return {
    dynamicDetail,
    refresh
  }
}
