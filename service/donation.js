import { get } from '@/service/base'
import { paths } from '@/service/path-map'
import { ref } from 'vue'
import { isMock } from '@/common/env'

export const getDonationDetail = params => get(paths.donationDetail, params)
export const getDonationRecords = params => get(paths.donationRecords, params)
export const getExpenditureDetailList = params => get(paths.expenditureDetailList, params)

function mapDonation(data) {
  const {
    fundraisingGoal,
    totalAmountRaised,
    numberOfDonors,
    registrationStartTime,
    registrationEndTime,
    activityStartTime,
    activityEndTime,
    contactPerson,
    contactPhone,
    datetime,
    id,
    title,
    paragraph
  } = data
  return {
    fundraisingGoal,
    totalAmountRaised,
    numberOfDonors,
    registrationStartTime,
    registrationEndTime,
    activityStartTime,
    activityEndTime,
    contactPerson,
    contactPhone,
    datetime,
    id,
    title,
    paragraph
  }
}
function mapDonationRecordAndExpenditureDetail(data) {
  const {
    name,
    cover,
    amount,
    datetime,
    id
  } = data
  return {
    name,
    cover,
    amount,
    datetime,
    id
  }
}

export function useDonationDetail() {
  const donationDetail = ref({
    fundraisingGoal: 0,
    totalAmountRaised: 0,
    numberOfDonors: 0,
    registrationStartTime: '',
    registrationEndTime: '',
    activityStartTime: '',
    activityEndTime: '',
    contactPerson: '',
    contactPhone: '',
    datetime: '',
    id: '',
    title: '',
    paragraph: '',
    imageList: []
  })
  async function _getDonationDetail() {
    let { data } = await getDonationDetail()
    if (!isMock) {
      data = mapDonation(data)
    }
    const {
      fundraisingGoal,
      totalAmountRaised,
      numberOfDonors,
      registrationStartTime,
      registrationEndTime,
      activityStartTime,
      activityEndTime,
      contactPerson,
      contactPhone
    } = data
    data.infoList = [
      { icon: '', label: '筹款目标', content: `${fundraisingGoal}￥` },
      { icon: '', label: '已筹金额', content: `${totalAmountRaised}￥` },
      { icon: '', label: '捐赠人数', content: `${numberOfDonors}人` },
      { icon: '', label: '报名时间', content: `${registrationStartTime} ~ ${registrationEndTime}` },
      { icon: '', label: '活动时间', content: `${activityStartTime} ~ ${activityEndTime}` },
      { icon: '', label: '联系人', content: contactPerson },
      { icon: '', label: '联系电话', content: contactPhone }
    ]
    return data
  }
  async function refresh() {
    donationDetail.value = await _getDonationDetail()
  }
  return {
    donationDetail,
    refresh
  }
}
export function useDonationRecords() {
  const donationRecords = ref([])
  async function _getDonationRecords() {
    let { data } = await getDonationRecords()
    if (!isMock) {
      data = data.map(item => mapDonationRecordAndExpenditureDetail(item))
    }
    return data
  }
  async function refresh() {
    donationRecords.value = await _getDonationRecords()
  }
  return {
    donationRecords,
    refresh
  }
}
export function useExpenditureDetailList() {
  const expenditureDetailList = ref([])
  async function _getExpenditureDetailList() {
    let { data } = await getExpenditureDetailList()
    if (!isMock) {
      data = data.map(item => mapDonationRecordAndExpenditureDetail(item))
    }
    return data
  }
  async function refresh() {
    expenditureDetailList.value = await _getExpenditureDetailList()
  }
  return {
    expenditureDetailList,
    refresh
  }
}