import { get, post, put } from '@/service/base'
import { reactive, ref } from 'vue'
import useLoadMore from '@/common/hook/use-load-more'
import { paths } from '@/service/path-map'
import { getFormRules } from '@/common/utils'
import { isMock } from '@/common/env'

export const getAlumniActivityList = params => get(paths.activityList, params)
export const getMyAlumniActivityList = params => get(paths.myActivityList, params)
export const getAlumniActivityDetail = params => get(paths.alumniActivityDetail, params)
export const activityRegistration = data => post(paths.activityRegistration, data)
export const activityCancelRegistration = data => put(paths.activityCancelRegistration, data)

const statusTextMap = {
  1: '报名中',
  2: '在进行'
}

function formatDatetime(startTime, endTime) {
  return `${startTime.slice(5, -3)} 至 ${endTime.slice(5, -3)}`
}

function mapActivity(data) {
  let {
    cover,
    title,
    startTime,
    endTime,
    applicationStart: applyStartTime,
    applicationEnd: applyEndTime,
    contact: registrationPhone,
    address: registrationAddress,
    number: activityAttendeeCount,
    expenses: activityPrice,
    content: paragraph,
    applyStatus: registered,
    applyId: registerId,
    status,
    id
  } = data

  return {
    cover,
    title,
    registrationPhone,
    registrationAddress,
    activityAttendeeCount,
    activityPrice,
    paragraph,
    status,
    id,
    registered,
    registerId,
    startTime: startTime.slice(0, -3),
    endTime: endTime.slice(0, -3),
    applyStartTime: applyStartTime.slice(0, -3),
    applyEndTime: applyEndTime.slice(0, -3)
  }
}

function mapActivityList(list) {
  return list.map(item => {
    const { cover, title, content: paragraph, startTime, endTime, status, id } = item
    return {
      cover,
      title,
      paragraph,
      startTime,
      endTime,
      status,
      id
    }
  })
}

function processAlumniActivity(data) {
  const {
    registrationAddress,
    activityAttendeeCount,
    activityPrice,
    applyStartTime,
    applyEndTime,
    startTime,
    endTime,
    registrationPhone,
    status
  } = data

  data.statusText = statusTextMap[status]
  data.infoList = [
    {
      icon: 'clock',
      label: '报名时间',
      content: `${applyStartTime.slice(0, -3)} 至 ${applyEndTime.slice(0, -3)}`
    },
    { icon: 'clock', label: '活动时间', content: `${startTime.slice(0, -3)} 至 ${endTime.slice(0, -3)}` },
    { icon: 'phone', label: '报名电话', content: registrationPhone },
    {
      icon: 'map',
      label: '活动地点',
      content: registrationAddress,
      endContent: { icon: 'custom-icon-navigate', content: '导航' }
    },
    { icon: 'account', label: '活动人数', content: activityAttendeeCount },
    { icon: 'rmb-circle', label: '活动费用', content: activityPrice + '￥/人' }
  ]
  data.datetime = `${startTime.slice(5, -3)} 至 ${endTime.slice(5, -3)}`
  return data
}

function processAlumniActivityList(list) {
  return list.map(item => {
    item.datetime = formatDatetime(item.startTime, item.endTime)
    return item
  })
}

export function useActivityList(fetchMy) {
  const { loadStatus, loadResult, noData, refresh, loadMore } = useLoadMore(
    fetchMy ? _getMyAlumniActivityList : _getAlumniActivityList
  )

  async function _getAlumniActivityList(params = {}) {
    let { data } = await getAlumniActivityList(params)
    if (!isMock) {
      data = mapActivityList(data.list)
    }
    return processAlumniActivityList(data)
  }

  async function _getMyAlumniActivityList(params = {}) {
    let { data } = await getMyAlumniActivityList(params)
    if (!isMock) {
      data = mapActivityList(data.list)
    }
    return processAlumniActivityList(data)
  }

  return {
    activityList: loadResult,
    loadStatus,
    noData,
    refresh,
    loadMore
  }
}

export function useAlumniActivityDetail(props) {
  const alumniActivityDetail = ref({
    cover: '',
    title: '',
    registrationPhone: '',
    registrationAddress: '',
    activityAttendeeCount: '',
    activityPrice: '',
    paragraph: '',
    status: 1,
    registered: false,
    registerId: '',
    id: '',
    infoList: [],
    startTime: '',
    endTime: '',
    applyStartTime: '',
    applyEndTime: '',
    datetime: ''
  })

  async function _getAlumniActivityDetail() {
    let { data } = await getAlumniActivityDetail(props)
    if (!isMock) {
      data = mapActivity(data)
    }
    return processAlumniActivity(data)
  }

  async function refresh() {
    alumniActivityDetail.value = await _getAlumniActivityDetail()
  }

  return {
    alumniActivityDetail,
    refresh
  }
}
