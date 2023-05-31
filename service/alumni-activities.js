import { get, post, put } from '@/service/base'
import { reactive, ref } from 'vue'
import useLoadMore from '@/common/hook/useLoadMore'
import { paths } from '@/service/path-map'
import { getFormRules } from '@/common/utils'
import { isMock } from '@/common/env'

export const getAlumniActivityList = params => get(paths.activityList, params)
export const getMyAlumniActivityList = params => get(paths.myActivityList, params)
export const getAlumniActivityDetail = params => get(paths.alumniActivityDetail, params)
export const activityRegistration = data => post(paths.activityRegistration, data)
export const activityCancelRegistration = data => put(paths.activityCancelRegistration, data)

function mapActivity(data) {
  let {
    cover,
    title,
    startTime,
    endTime,
    applicationStart: applyStartTime,
    applicationEnd: applyEndTime,
    updatedAt: datetime,
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
    applyEndTime: applyEndTime.slice(0, -3),
    datetime: datetime.slice(0, -3)
  }
}

function processAlumniActivity(item) {
  const {
    registrationAddress,
    activityAttendeeCount,
    activityPrice,
    applyStartTime,
    applyEndTime,
    startTime,
    endTime,
    datetime,
    registrationPhone
  } = item
  item.datetime = datetime.slice(0, -3)
  item.infoList = [
    { icon: 'clock', label: '报名时间', content: `${applyStartTime.slice(0, -3)} 至 ${applyEndTime.slice(0, -3)}`  },
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
  return item
}

export function useActivityList(fetchMy) {
  const { loadStatus, loadResult, noData, refresh, loadMore } = useLoadMore(
    fetchMy ? _getMyAlumniActivityList : _getAlumniActivityList
  )

  async function _getAlumniActivityList(arg = {}) {
    let { data } = await getAlumniActivityList({ ...arg })
    if (!isMock) {
      data = data.list.map(item => mapActivity(item))
    }
    data = data.map(item => processAlumniActivity(item))
    return data
  }

  async function _getMyAlumniActivityList(arg = {}) {
    let { data } = await getMyAlumniActivityList({ ...arg })
    if (!isMock) {
      data = data.list.map(item => mapActivity(item))
    }
    return data.map(item => processAlumniActivity(item))
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

export function useActivityRegistration(props) {
  const formRef = ref()
  const form = reactive({ name: '', phone: '' })
  const { rules } = getFormRules(form, ['name', 'phone'])

  async function submit() {
    const valid = await formRef.value.validate()
    if (valid) {
      form.mobile = form.phone
      form.activityId = props.id
      const { err } = await activityRegistration(form)
      if (!err) {
        uni.$u.toast('报名成功')
        formRef.value.resetFields()
      }
    }
  }

  return {
    formRef,
    form,
    rules,
    submit
  }
}

export function useRegisteredActivities() {
  const { activityList: registeredActivities, refresh, noData, loadStatus, loadMore } = useActivityList(true)
  return {
    registeredActivities,
    refresh,
    noData,
    loadStatus,
    loadMore
  }
}
