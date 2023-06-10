import { get } from '@/service/base'
import { computed, ref } from 'vue'
import useSearch from '@/common/hook/use-search'
import { isInSelectedAlumniList, selectedAlumniAssociation } from '@/stores/certification'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'

export const getAlumniList = params => get(paths.alumniList, params)
export const getAlumniAssociationList = params => get(paths.alumniAssociationList, params)
export const getAlumniAssociationDetail = params => get(paths.alumniAssociationDetail, params)
export const getAlumniDetail = params => get(paths.alumniDetail, params)

function mapAlumniAssociation(data) {
  const {
    name,
    avatar,
    contact: leader,
    mobile: phone,
    email,
    address,
    employeeCount,
    enterpriseCount,
    activityCount,
    demandAndSupplyCount,
    introduction: paragraph,
    id
  } = data

  return {
    name,
    avatar,
    employeeCount,
    phone,
    leader,
    email,
    address,
    enterpriseCount,
    activityCount,
    demandAndSupplyCount,
    paragraph,
    id
  }
}

function mapAlumni(data) {
  const {
    name,
    avatar,
    sex,
    graduationInfo,
    id,
    phone,
    enterprise,
    city,
    jobPositions,
    paragraph,
    enterpriseInfo
  } = data
  return {
    name,
    avatar,
    sex,
    graduationInfo,
    id,
    phone,
    enterprise,
    city,
    jobPositions,
    paragraph,
    enterpriseInfo
  }
}

async function _getAlumniList(arg = {}) {
  let { data } = await getAlumniList({ ...arg })
  if (!isMock) {
    data = data.map(item => mapAlumni(item))
  }
  return data.map(item => {
    item.desc = item.graduationInfo
    item.selected = isInSelectedAlumniList(item)
    return item
  })
}

async function _getAlumniAssociationList(arg = {}) {
  let { data } = await getAlumniAssociationList({ ...arg })
  if (!isMock) {
    data = data.map(item => mapAlumniAssociation(item))
  }
  data = data.map(item => {
    item.desc = `${item.leader} | ${item.employeeCount}人加入校友会`
    item.selected = item.id === (selectedAlumniAssociation.value && selectedAlumniAssociation.value.id)
    return item
  })
  return data
}

export function useSearchAlumniListAndAlumniAssociationList() {
  const currentView = ref('left')
  const fetch = computed(() => (currentView.value === 'left' ? _getAlumniAssociationList : _getAlumniList))
  const { query, searchResult, refresh, loadStatus, loadMore } = useSearch(fetch)

  return {
    query,
    searchResult,
    refresh,
    loadStatus,
    loadMore,
    currentView
  }
}

export function useSearchAlumniList() {
  const { query, searchResult, refresh, loadStatus, loadMore } = useSearch(_getAlumniList)
  return {
    query,
    searchResult,
    refresh,
    loadStatus,
    loadMore
  }
}

export function useAlumniAssociationList() {
  const { query, searchResult, refresh, loadStatus, loadMore } = useSearch(_getAlumniAssociationList)
  return {
    query,
    searchResult,
    refresh,
    loadStatus,
    loadMore
  }
}

export function useAlumniAssociationDetail() {
  const alumniAssociationDetail = ref({
    name: '',
    avatar: '',
    employeeCount: '',
    phone: '',
    leader: '',
    email: '',
    address: '',
    enterpriseCount: '',
    activityCount: '',
    demandAndSupplyCount: '',
    paragraph: '',
    id: '',
    infoList: [],
    nameNumberList: []
  })

  async function _getAlumniAssociationDetail() {
    let { data } = await getAlumniAssociationDetail()
    if (!isMock) {
      data = mapAlumniAssociation(data)
    }
    const { phone, leader, email, address, employeeCount, enterpriseCount, activityCount, demandAndSupplyCount } =
      data
    data.infoList = [
      { icon: 'phone', label: '', content: phone + ` (${leader})` },
      { icon: 'email', label: '', content: email },
      { icon: 'map', label: '', content: address }
    ]
    data.nameNumberList = [
      { name: '会员', number: employeeCount },
      { name: '企业', number: enterpriseCount },
      { name: '活动', number: activityCount },
      { name: '供需', number: demandAndSupplyCount }
    ]
    return data
  }

  async function refresh() {
    alumniAssociationDetail.value = await _getAlumniAssociationDetail()
    console.log(alumniAssociationDetail, 'alumniAssociationDetail')
  }

  return {
    alumniAssociationDetail,
    refresh
  }
}

export function useAlumniDetail() {
  const alumniDetail = ref({
    name: '',
    avatar: '',
    sex: '',
    graduationInfo: '',
    id: '',
    phone: '',
    enterprise: '',
    city: '',
    jobPositions: '',
    paragraph: '',
    enterpriseInfo: {
      name: '',
      avatar: '',
      city: '',
      employeeCount: '',
      industry: '',
      desc: ''
    }
  })

  async function _getAlumniDetail() {
    let { data } = await getAlumniDetail()
    if (!isMock) {
      data = mapAlumni(data)
    }
    const { jobPositions, city, phone, graduationInfo, enterprise, enterpriseInfo } = data
    data.enterpriseInfo.desc = `${enterpriseInfo.city} | ${enterpriseInfo.enterpriseScale} | ${enterpriseInfo.industryText}`
    data.infoList = [
      { icon: 'phone', label: '', content: phone },
      { icon: 'email', label: '', content: `${jobPositions} | ${enterprise}` },
      { icon: 'map', label: '', content: city },
      { icon: 'map', label: '', content: graduationInfo }
    ]
    return data
  }

  async function refresh() {
    alumniDetail.value = await _getAlumniDetail()
  }

  return {
    alumniDetail,
    refresh
  }
}
