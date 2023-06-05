import { get } from '@/service/base'
import { reactive } from 'vue'
import { paths } from '@/service/path-map'
import useSearch from '@/common/hook/use-search'
import { isMock } from '@/common/env'

export const getProfile = params => get(paths.profile, params)
export const getPaymentRecords = params => get(paths.paymentRecords, params)
export const getOrderList = params => get(paths.orderList, params)
export const getOrderDetail = params => get(paths.orderDetail, params)
export const getDeliveryAddressList = params => get(paths.deliveryAddressList, params)
export const getDeliveryAddressDetail = params => get(paths.deliveryAddressDetail, params)

function mapOrder(data) {
  const { orderNum, orderTime, paymentMethod, paymentTime, shippingInfo, orderStatus, id, productList } = data
  return {
    orderNum,
    orderTime,
    paymentMethod,
    paymentTime,
    shippingInfo,
    orderStatus,
    id,
    productList
  }
}

export function mapDeliveryAddress(data) {
  const { shippingAddress, shippingAddressLine, receiverPhone, isDefault, receiverName, id, placeholderAddress } =
    data
  return {
    shippingAddress,
    shippingAddressLine,
    receiverPhone,
    isDefault,
    receiverName,
    id,
    placeholderAddress
  }
}

export function useOrderDetail() {
  const orderDetail = reactive({
    orderNum: '',
    orderTime: '',
    orderTotalPrice: 0,
    paymentMethod: '',
    paymentTime: '',
    shippingInfo: {
      shippingAddress: '',
      shippingMethod: '',
      receiverName: '',
      receiverPhone: ''
    },
    orderStatus: 0,
    id: '',
    productList: []
  })

  async function _getOrderDetail(params) {
    let { data } = await getOrderDetail({ id: params.id })
    if (!isMock) {
      data = mapOrder(data)
    }
    return data
  }

  async function refresh(params) {
    const {
      orderNum,
      orderTime,
      orderTotalPrice,
      paymentMethod,
      paymentTime,
      shippingInfo,
      orderStatus,
      id,
      productList
    } = await _getOrderDetail(params)
    const paymentMethodMap = {
      1: '微信支付',
      2: '支付宝支付',
      3: '银行卡支付'
    }
    const shippingMethodMap = {
      1: '顺丰快递',
      2: '韵达快递',
      3: '中通快递',
      4: '申通快递',
      5: '圆通快递'
    }
    orderDetail.orderNum = orderNum
    orderDetail.orderTime = orderTime
    orderDetail.orderTotalPrice = orderTotalPrice
    orderDetail.paymentMethod = paymentMethod
    orderDetail.paymentTime = paymentTime
    orderDetail.shippingInfo = shippingInfo
    orderDetail.orderStatus = orderStatus
    orderDetail.id = id
    orderDetail.productList = productList
    orderDetail.infoList = [
      { label: '订单编号', content: orderNum },
      { label: '下单时间', content: orderTime },
      { label: '支付方式', content: paymentMethodMap[paymentMethod] },
      { label: '支付时间', content: paymentTime }
    ]
    orderDetail.infoList2 = [
      { label: '配送方式', content: shippingMethodMap[shippingInfo.shippingMethod] },
      { label: '收货地址', content: shippingInfo.shippingAddress },
      { label: '收货人姓名', content: shippingInfo.receiverName },
      { label: '收货人手机号', content: shippingInfo.receiverPhone }
    ]
  }

  return {
    orderDetail,
    refresh
  }
}

export function useSearchOrderList() {
  const { query, searchResult, refresh, setParamsAndRefresh, noData, loadMore, loadStatus } =
    useSearch(_getOrderList)

  async function _getOrderList(params) {
    let { data } = await getOrderList(params)
    if (!isMock) {
      data = data.map(item => mapOrder(item))
    }
    return data
  }

  return { query, searchResult, refresh, setParamsAndRefresh, noData, loadMore, loadStatus }
}

export async function _getDeliveryAddressList() {
  let { data } = await getDeliveryAddressList()
  if (!isMock) {
    data = data.map(item => mapDeliveryAddress(item))
  }
  return data
}

async function _getDeliveryAddressDetail(params) {
  let { data } = await getDeliveryAddressDetail(params)
  if (!isMock) {
    data = mapDeliveryAddress(data)
  }
  return data
}

export function useDeliveryAddressDetail(props) {
  const deliveryAddressDetail = reactive({
    shippingAddress: '',
    shippingAddressLine: '',
    receiverPhone: '',
    isDefault: false,
    receiverName: '',
    id: '',
    placeholderAddress: ''
  })

  async function refresh() {
    const { shippingAddress, shippingAddressLine, receiverPhone, isDefault, receiverName, id } =
      await _getDeliveryAddressDetail({ id: props.id })
    deliveryAddressDetail.shippingAddress = shippingAddress
    deliveryAddressDetail.shippingAddressLine = shippingAddressLine
    deliveryAddressDetail.receiverPhone = receiverPhone
    deliveryAddressDetail.isDefault = isDefault
    deliveryAddressDetail.receiverName = receiverName
    deliveryAddressDetail.id = id
    deliveryAddressDetail.placeholderAddress = shippingAddress
  }

  return { deliveryAddressDetail, refresh }
}
