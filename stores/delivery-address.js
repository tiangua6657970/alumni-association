import { reactive, ref } from 'vue'
import { getDeliveryAddressList, processDeliveryAddress } from '@/service/personal-center'
import { isMock } from '@/common/env'

export const deliveryAddressListStore = ref([])
async function _getDeliveryAddressList() {
  let { data } = await getDeliveryAddressList()
  if (!isMock) {
    data =  data.map(item => processDeliveryAddress(item))
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
