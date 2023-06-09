import { __TOKEN__ } from '@/common/keys'

export const pathMap = {
  // 首页
  index: '/pages/index/index',
  // 搜索
  search: '/pages/search/search',
  // 登录
  // 活动
  alumniActivities: '/pages/alumni-activities/alumni-activities',
  // 活动报名
  alumniActivityRegistration: '/pages/alumni-activity-registration/alumni-activity-registration',
  // 活动详情
  alumniActivityDetail: '/pages/alumni-activity-detail/alumni-activity-detail',
  addAlumniAssociation: '/pages/add-alumni-association/add-alumni-association',
  donation: '/pages/donation/donation',
  donationDetail: '/pages/donation-detail/donation-detail',
  customerAuthentication: '/pages/customer-authentication/customer-authentication',
  alumniEnterpriseDetail: '/pages/alumni-enterprise-detail/alumni-enterprise-detail',
  authenticationMethods: '/pages/authentication-methods/authentication-methods',
  forgotPassword: '/pages/forgot-password/forgot-password',
  alumniDetail: '/pages/alumni-detail/alumni-detail',
  alumniAssociationDetail: '/pages/alumni-association-detail/alumni-association-detail',
  alumniAndAlumniAssociationList: '/pages/alumni-and-alumni-association-list/alumni-and-alumni-association-list',
  alumniList: '/pages/alumni-list/alumni-list',
  alumniAssociationList: '/pages/alumni-association-list/alumni-association-list',
  alumniEnterprise: '/pages/alumni-enterprise/alumni-enterprise',
  alumniEnterpriseCertification: '/pages/alumni-enterprise-certification/alumni-enterprise-certification',
  alumniCertification: '/pages/alumni-certification/alumni-certification',
  alumniCertificationTips: '/pages/alumni-certification-tips/alumni-certification-tips',
  dynamic: '/pages/dynamic/dynamic',
  dynamicDetail: '/pages/dynamic-detail/dynamic-detail',
  studentIdVerification: '/pages/student-id-verification/student-id-verification',
  login: '/pages/login/login',
  register: '/pages/register/register',
  jobPositions: '/pages/job-positions/job-positions',
  editProfile: '/pages/edit-profile/edit-profile',
  orderReview: '/pages/order-review/order-review',
  postDemandAndSupply: '/pages/post-demand-and-supply/post-demand-and-supply',
  personalCenter: '/pages/personal-center/personal-center',
  supplyAndDemand: '/pages/supply-and-demand/supply-and-demand',
  supplyAndDemandDetail: '/pages/supply-and-demand-detail/supply-and-demand-detail',
  industry: '/pages/industry/industry',
  suggestionsAndFeedback: '/pages/suggestions-and-feedback/suggestions-and-feedback',
  settings: '/pages/settings/settings',
  deliveryAddress: '/pages/delivery-address/delivery-address',
  addDeliveryAddress: '/pages/add-delivery-address/add-delivery-address',
  myOrders: '/pages/my-orders/my-orders',
  myOrdersDetail: '/pages/my-orders-detail/my-orders-detail',
  myActivities: '/pages/my-activities/my-activities',
  mySupplyAndDemand: '/pages/my-supply-and-demand/my-supply-and-demand',
  privacy: '/pages/privacy/privacy',
  paymentRecords: '/pages/payment-records/payment-records',
  shoppingCart: '/pages/shopping-cart/shopping-cart',
  confirmOrder: '/pages/confirm-order/confirm-order',
  shop: '/pages/shop/shop',
  productReview: '/pages/product-review/product-review',
  productDetail: '/pages/product-detail/product-detail',
  payment: '/pages/payment/payment',
  paymentResult: '/pages/payment-result/payment-result',
  shipmentTracking: '/pages/shipment-tracking/shipment-tracking'
}

export function joinUrl(path, params = {}) {
  const isString = typeof params === 'string'
  return (
    path +
    '?' +
    (isString
      ? params
      : Object.entries(params)
          .map(item => item.join('='))
          .join('&'))
  )
}

/**
 * 必须登录才能访问的页面
 * @type {string[]}
 */
const loginRequiredPages = [
  pathMap.alumniActivityDetail,
  pathMap.alumniEnterpriseDetail,
  pathMap.donationDetail,
  pathMap.supplyAndDemandDetail,
  pathMap.confirmOrder,
  pathMap.editProfile,
  pathMap.myActivities,
  pathMap.mySupplyAndDemand,
  pathMap.paymentRecords,
  pathMap.myOrders,
  pathMap.privacy,
  pathMap.suggestionsAndFeedback,
  pathMap.settings,
  pathMap.alumniDetail,
  pathMap.alumniAssociationDetail,
  pathMap.postDemandAndSupply,
  pathMap.alumniEnterpriseCertification
]

/**
 *
 * @param path {string}
 * @param params
 */
export function navigateTo(path, params = {}) {
  if (loginRequiredPages.findIndex(item => item === path) !== -1) {
    if (!uni.getStorageSync(__TOKEN__)) {
      navigateToLogin()
      return
    }
  }
  const url = joinUrl(path, params)
  uni.navigateTo({
    url: url,
    fail: err => console.log(err, 'err')
  })
}

export function switchTabToIndex(arg = {}) {
  uni.switchTab({ url: pathMap.index })
}

export function switchTabToShop(arg = {}) {
  uni.switchTab({ url: pathMap.shop })
}

export function navigateToRegister() {
  navigateTo(pathMap.register)
}

export function navigateToLogin() {
  navigateTo(pathMap.login)
}
export function navigateEditProfile() {
  navigateTo(pathMap.editProfile)
}

export function navigateToForgotPassword() {
  navigateTo(pathMap.forgotPassword)
}

export function navigateToDonation() {
  navigateTo(pathMap.donation)
}

export function navigateToAlumniList() {
  navigateTo(pathMap.alumniList)
}

export function navigateToAlumniAssociationList() {
  navigateTo(pathMap.alumniAssociationList)
}

export function navigateToAlumniAndAlumniAssociationList() {
  navigateTo(pathMap.alumniAndAlumniAssociationList)
}

export function navigateToAlumniDetail() {
  navigateTo(pathMap.alumniDetail)
}

export function navigateToAlumniAssociationDetail() {
  navigateTo(pathMap.alumniAssociationDetail)
}

export function navigateToDynamic() {
  navigateTo(pathMap.dynamic)
}

export function navigateToDynamicDetail(params) {
  navigateTo(pathMap.dynamicDetail, params)
}

export function navigateToActivityDetail(item) {
  navigateTo(pathMap.alumniActivityDetail, { id: item.id })
}

export function navigateToAlumniActivities() {
  navigateTo(pathMap.alumniActivities)
}

export function navigateToAlumniEnterprise(item) {
  navigateTo(pathMap.alumniEnterprise)
}

export function navigateToAlumniActivityRegistration(item) {
  navigateTo(pathMap.alumniActivityRegistration, { id: item.id })
}

export function navigateToAlumniEnterpriseDetail(item) {
  navigateTo(pathMap.alumniEnterpriseDetail, { id: item.id })
}

export function navigateToSupplyAndDemandDetail(item) {
  navigateTo(pathMap.supplyAndDemandDetail, { id: item.id })
}

export function navigateToProductDetail(item) {
  navigateTo(pathMap.productDetail, { id: item.id })
}

export function navigateToPostDemandAndSupply() {
  navigateTo(pathMap.postDemandAndSupply)
}

export function navigateToShoppingCart() {
  navigateTo(pathMap.shoppingCart)
}

export function navigateToConfirmOrder() {
  navigateTo(pathMap.confirmOrder)
}

export function navigateToAddDeliveryAddress(arg = {}) {
  navigateTo(pathMap.addDeliveryAddress, { ...arg })
}

export function navigateToDeliveryAddress(arg = {}) {
  navigateTo(pathMap.deliveryAddress, { ...arg })
}

export function navigateToPayment(arg = {}) {
  navigateTo(pathMap.payment, { ...arg })
}

export function navigateToPaymentResult(arg = {}) {
  navigateTo(pathMap.paymentResult, { ...arg })
}

export function navigateToMyOrdersDetail(item = {}) {
  navigateTo(pathMap.myOrdersDetail, { id: item.id })
}

export function navigateToShipmentTracking() {}

export function navigateToAlumniEnterpriseCertification() {
  navigateTo(pathMap.alumniEnterpriseCertification)
}

export function navigateToAlumniCertificationTips() {
  navigateTo(pathMap.alumniCertificationTips)
}

export function navigateToAlumniCertification() {
  navigateTo(pathMap.alumniCertification)
}

export function navigateToAuthenticationMethods() {
  navigateTo(pathMap.authenticationMethods)
}

export function navigateToStudentIdVerification() {
  navigateTo(pathMap.studentIdVerification)
}

export function navigateToCustomerAuthentication() {
  navigateTo(pathMap.customerAuthentication)
}

export function navigateToJobPositions(item) {
  navigateTo(pathMap.jobPositions, { id: item.id })
}
