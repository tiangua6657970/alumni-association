import { get, post } from '@/service/base'
import useSearch from '@/common/hook/use-search'
import { computed, reactive, ref, watch } from 'vue'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'
import { TYPE_LIST } from "@/common/constants";

export const getSupplyAndDemandList = params => post(paths.supplyAndDemandList, params)
export const getSupplyAndDemandDetail = params => get(paths.supplyAndDemandDetail, params)
export const postDemandAndSupply = data => post(paths.postDemandAndSupply, data)

function mapSupplyAndDemand(data) {
  const {
    title,
    updateAt: datetime,
    startTime: validStartTime,
    endTime: validEndTime,
    browseCount,
    industryId,
    industryText,
    address,
    illustrate: paragraph,
    id,
    type,
    typeText,
    enterpriseId,
    enterpriseInfo
  } = data

  return {
    title,
    datetime,
    validStartTime,
    validEndTime,
    browseCount: browseCount || 0,
    industryId,
    industryText,
    address,
    paragraph,
    id,
    type,
    typeText,
    enterpriseId,
    enterpriseInfo
  }
}

function _processSupplyAndDemand(data) {
  const { industryText, address, validStartTime, validEndTime } = data
  data.infoList = [
    { label: '供需行业', content: industryText },
    { label: '供需地址', content: address },
    { label: '有效时间', content: `${validStartTime} 至 ${validEndTime}` }
  ]
  return data
}

export async function _getSupplyAndDemandList(arg = {}) {
  let { data } = await getSupplyAndDemandList({ ...arg })
  if (!isMock) {
    data = data.list.map(item => mapSupplyAndDemand(item))
  }
  return data.map(item => _processSupplyAndDemand(item))
}

export function useSupplyAndDemandList() {
  const supplyAndDemandList = ref([])
  async function refresh(params) {
    supplyAndDemandList.value = await _getSupplyAndDemandList(params)
  }
  return {
    supplyAndDemandList,
    refresh
  }
}
export function useSearchSupplyAndDemandList() {
  const {
    query,
    searchResult,
    refresh,
    loadStatus,
    noData,
    loadMore,
    setParamsAndRefresh,
    resetParamsAndRefresh
  } = useSearch(_getSupplyAndDemandList)

  return {
    query,
    searchResult,
    refresh,
    loadStatus,
    noData,
    loadMore,
    setParamsAndRefresh,
    resetParamsAndRefresh
  }
}

export function useSupplyAndDemandDetail(props) {
  const detailData = reactive({
    title: '',
    datetime: '',
    validStartTime: '',
    validEndTime: '',
    browseCount: '',
    industry: '',
    address: '',
    paragraph: '',
    id: '',
    type: '',
    typeText: '',
    enterpriseId: '',
    enterpriseInfo: {
      cover: '',
      id: '',
      avatar: '',
      name: '',
      city: '',
      address: '',
      enterpriseScale: 0,
      industry: '',
      phone: '',
      paragraph: '',
      legalRepresentative: '',
      registrationDate: '',
      registeredCapital: '',
      registeredAddress: '',
      creditCode: ''
    },
    infoList: []
  })

  async function _getSupplyAndDemandDetail() {
    let { data } = await getSupplyAndDemandDetail({ id: props.id })
    if (!isMock) {
      data = mapSupplyAndDemand(data)
    }
    return _processSupplyAndDemand(data)
  }

  const refresh = async () => {
    const data = await _getSupplyAndDemandDetail()
    for (const dataKey in data) {
      detailData[dataKey] = data[dataKey]
    }
  }
  return {
    detailData,
    refresh
  }
}

export function usePostDemandAndSupply() {}
