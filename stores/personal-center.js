import { computed, ref } from 'vue'
import { getDeliveryAddressList, getProfile, mapDeliveryAddress } from '@/service/personal-center'
import { isMock } from '@/common/env'
import { __USERINFO__ } from '@/common/keys'

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
    code,
    isAuthenticated
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
    code,
    isAuthenticated
  }
}
const profileDefaultStore = {
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
  desc: '',
  isAuthenticated: false
}
function getLocalProfileStore() {
  try {
    return uni.getStorageSync(__USERINFO__) || profileDefaultStore
  } catch (err) {
    console.log('[getLocalProfileStore err]',err)
    return profileDefaultStore
  }
}

export const profileStore = ref(getLocalProfileStore())

async function _getProfile() {
  let { data } = await getProfile()
  if (!isMock) {
    data = mapProfile(data)
  }
  return data
}

export async function refreshProfileStore() {
  const data = await _getProfile()
  profileStore.value = data
  profileStore.value.desc = `${data.enterpriseInfo.name} | ${data.jobPositions}`
  uni.setStorageSync(__USERINFO__, profileStore.value)
  return profileStore.value
}
export function resetProfileDefaultStore() {
  profileStore.value = profileDefaultStore
  uni.removeStorageSync(__USERINFO__)
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
