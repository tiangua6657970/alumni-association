import { get } from '@/service/base'
import { nextTick, ref } from 'vue'
import useSearch from '@/common/hook/use-search'
import { paths } from '@/service/path-map'
import { isMock } from '@/common/env'

export const getAlumniEnterpriseList = params => get(paths.alumniEnterpriseList, params)
export const getAlumniEnterpriseDetail = params => get(paths.alumniEnterpriseDetail, params)
export const getAlumniEnterpriseJodList = params => get(paths.alumniEnterpriseJodList, params)
export const getAlumniEnterpriseJodDetail = params => get(paths.alumniEnterpriseJodDetail, params)
export const getAlumniEnterpriseProductServiceList = params =>
  get(paths.alumniEnterpriseProductServiceList, params)
export const getAlumniAchievementsList = params => get(paths.alumniAchievementsList, params)

function mapEnterprise(data) {
  const {
    cover,
    avatar,
    city,
    address,
    enterpriseScale,
    industry,
    industryText,
    phone,
    paragraph,
    legalRepresentative,
    registrationDate,
    registeredCapital,
    registeredAddress,
    creditCode,
    id
  } = data
  return {
    cover,
    avatar,
    city,
    address,
    enterpriseScale,
    industry,
    industryText,
    phone,
    paragraph,
    legalRepresentative,
    registrationDate,
    registeredCapital,
    registeredAddress,
    creditCode,
    id
  }
}

function mapEnterpriseList(list) {
  return list.map(item => {
    const { cover, avatar, city, address, enterpriseScale, industry, industryText, id } = item
    return { cover, avatar, city, address, enterpriseScale, industry, industryText, id }
  })
}

function mapEnterpriseJod(data) {
  const { title, city, workYears, education, salary, id, jobResponsibilities, jobRequirements } = data
  return {
    title,
    city,
    workYears,
    education,
    salary,
    id,
    jobResponsibilities,
    jobRequirements
  }
}

async function _getAlumniEnterpriseList(params) {
  let { data } = await getAlumniEnterpriseList(params)
  if (!isMock) {
    data = mapEnterpriseList(data)
  }
  return data.map(item => {
    item.desc = `${item.city} | ${item.enterpriseScale} | ${item.industryText}`
    return item
  })
}

export function useAlumniEnterpriseList() {
  const alumniEnterpriseList = ref([])

  async function refresh() {
    return (alumniEnterpriseList.value = await _getAlumniEnterpriseList())
  }

  return {
    alumniEnterpriseList,
    refresh
  }
}

export function useSearchAlumniEnterpriseList() {
  const {
    query,
    searchResult,
    loadStatus,
    noData,
    refresh,
    refreshFactory,
    loadMore,
    setParamsAndRefresh,
    resetParamsAndRefresh
  } = useSearch(_getAlumniEnterpriseList)
  return {
    query,
    searchResult,
    loadStatus,
    noData,
    refresh,
    refreshFactory,
    loadMore,
    setParamsAndRefresh,
    resetParamsAndRefresh
  }
}

export function useAlumniEnterpriseDetail() {
  const alumniEnterpriseDetail = ref({
    name: '',
    cover: '',
    avatar: '',
    city: '',
    address: '',
    enterpriseScale: '',
    industry: '',
    industryText: '',
    phone: '',
    paragraph: '',
    legalRepresentative: '',
    registrationDate: '',
    registeredCapital: '',
    registeredAddress: '',
    creditCode: '',
    desc: '',
    infoList1: [],
    infoList2: []
  })
  const alumniEnterpriseJodList = ref([])
  const alumniEnterpriseProductServiceList = ref([])
  const alumniAchievementsList = ref([])

  async function _getAlumniEnterpriseDetail() {
    let { data } = await getAlumniEnterpriseDetail()
    if (!isMock) {
      data = mapEnterprise(data)
    }
    const {
      name,
      city,
      address,
      enterpriseScale,
      industryText,
      phone,
      legalRepresentative,
      registrationDate,
      registeredCapital,
      registeredAddress,
      creditCode
    } = data
    data.desc = `${city} | ${enterpriseScale} | ${industryText}`
    data.infoList1 = [
      { icon: 'phone', label: '', content: phone },
      { icon: 'map', label: '', content: address }
    ]
    data.infoList2 = [
      { label: '公司名称：', content: name },
      { label: '企业法人：', content: legalRepresentative },
      { label: '注册时间：', content: registrationDate },
      { label: '注册资本：', content: registeredCapital },
      { label: '注册地址：', content: registeredAddress },
      { label: '统一信用代码', content: creditCode }
    ]
    return data
  }

  async function _getAlumniEnterpriseJodList() {
    let { data } = await getAlumniEnterpriseJodList()
    if (!isMock) {
      data = data.map(item => mapEnterpriseJod(item))
    }
    return data
  }

  async function _getAlumniEnterpriseProductServiceList() {
    let { data } = await getAlumniEnterpriseProductServiceList()
    if (!isMock) {
    }
    return data
  }

  async function _getAlumniAchievementsList() {
    let { data } = await getAlumniAchievementsList()
    if (!isMock) {
    }
    return data
  }

  async function refreshAlumniEnterpriseDetail(refreshNextTickCallback) {
    alumniEnterpriseDetail.value = await _getAlumniEnterpriseDetail()
    await nextTick()
    refreshNextTickCallback && refreshNextTickCallback()
  }

  async function refreshAlumniEnterpriseJodList() {
    alumniEnterpriseJodList.value = await _getAlumniEnterpriseJodList()
  }

  async function refreshAlumniEnterpriseProductServiceList() {
    alumniEnterpriseProductServiceList.value = await _getAlumniEnterpriseProductServiceList()
  }

  async function refreshAlumniAchievementsList() {
    alumniAchievementsList.value = await _getAlumniAchievementsList()
  }

  return {
    alumniEnterpriseDetail,
    alumniEnterpriseJodList,
    alumniEnterpriseProductServiceList,
    alumniAchievementsList,
    refreshAlumniEnterpriseDetail,
    refreshAlumniEnterpriseJodList,
    refreshAlumniEnterpriseProductServiceList,
    refreshAlumniAchievementsList
  }
}

export function useAlumniEnterpriseJodDetail() {
  const alumniEnterpriseJodDetail = ref({
    title: '',
    city: '',
    workYears: '',
    education: '',
    salary: '',
    id: '',
    jobResponsibilities: [],
    jobRequirements: []
  })

  async function _getAlumniEnterpriseJodDetail() {
    let { data } = await getAlumniEnterpriseJodDetail()
    if (!isMock) {
      data = mapEnterpriseJod(data)
    }
    return data
  }

  async function refresh() {
    alumniEnterpriseJodDetail.value = await _getAlumniEnterpriseJodDetail()
  }

  return {
    alumniEnterpriseJodDetail,
    refresh
  }
}
