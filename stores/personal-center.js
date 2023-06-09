import { computed, reactive, ref } from 'vue'
import { getDeliveryAddressList, getProfile, mapDeliveryAddress } from '@/service/personal-center'
import { isMock } from '@/common/env'

export const loginStatus = ref(false)
export function updateLoginStatus(payload) {
  loginStatus.value = payload
}

function mapProfile(data) {
  const {
    userNickname: name,
    avatar,
    sex,
    graduationInfo,
    id,
    organizationId: alumniAssociationId,
    enterpriseId,
    mobile: phone,
    userPassword: password,
    city,
    jobPositions,
    describe: paragraph,
    enterpriseInfo,
    birthday: dateOfBirt,
    nativePlace,
    address,
    userEmail: email,
    code
  } = data
  return {
    name,
    avatar,
    sex,
    graduationInfo,
    id,
    alumniAssociationId,
    enterpriseId,
    phone,
    password,
    city,
    jobPositions,
    paragraph,
    enterpriseInfo,
    dateOfBirt,
    nativePlace,
    address,
    email,
    code
  }
}

export const profileStore = reactive({
  name: '',
  avatar: '',
  sex: '',
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
    enterpriseScale: '',
    industry: ''
  },
  dateOfBirt: '',
  nativePlace: '',
  address: '',
  addressLine: '',
  email: '',
  code: '',
  desc: ''
})

async function _getProfile() {
  let { data } = await getProfile()
  if (!isMock) {
    data = mapProfile(data)
  }
  return data
}

export async function refreshProfileStore() {
  const data = await _getProfile()
  for (const dataKey in data) {
    profileStore[dataKey] = data[dataKey]
  }
  profileStore.desc = `${data.enterpriseInfo.name} | ${data.jobPositions}`
}

export const deliveryAddressListStore = ref([])

async function _getDeliveryAddressList() {
  let { data } = await getDeliveryAddressList()
  if (!isMock) {
    data = data.map(item => mapDeliveryAddress(item))
  }
  return data
}

export async function refreshDeliveryAddressList() {
  const list = await _getDeliveryAddressList()
  const index = list.findIndex(item => item.isDefault)
  if (index !== -1) {
    const defaultDeliveryAddress = list[index]
    list[index] = list[0]
    list[0] = defaultDeliveryAddress
    list.forEach((item, index) => {
      item.selected = index === 0
    })
  }
  deliveryAddressListStore.value = list
}

export const selectedDeliveryAddress = computed(() => deliveryAddressListStore.value.find(item => item.selected))
