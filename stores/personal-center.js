import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { getProfile } from '@/service/personal-center'
import { deliveryAddressListStore } from '@/stores/delivery-address'


function processProfile(data) {
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
const usePersonalCenterStore = defineStore('personalCenter', () => {
  const storeData = reactive({
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
    email: '',
    code: '',
    desc: ''
  })
  const selectedDeliveryAddress = computed(() => deliveryAddressListStore.value.find(item => item.selected))

  async function refresh() {
    const data = await _getProfile()
    for (const dataKey in data) {
      storeData[dataKey] = data[dataKey]
    }
    storeData.desc = `${data.enterpriseInfo.name} | ${data.jobPositions}`
  }

  async function _getProfile() {
    const { data } = await getProfile()
    return data
  }

  return { storeData, refresh, selectedDeliveryAddress }
})
export default usePersonalCenterStore
