export default function useNavigate() {
  const pathMap = {
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
    register:'/pages/register/register',
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

  function joinUrl(path, params = {}) {
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
   *
   * @param path {string}
   * @param params
   */
  function navigateTo(path, params = {}) {
    const url = joinUrl(path, params)
    uni.navigateTo({
      url: url,
      fail: err => console.log(err, 'err')
    })
  }

  function switchTabToIndex(arg = {}) {
    uni.switchTab({ url: pathMap.index })
  }

  function switchTabToShop(arg = {}) {
    uni.switchTab({ url: pathMap.shop })
  }

  function navigateToRegister() {
    navigateTo(pathMap.register)
  }
  function navigateToLogin() {
    navigateTo(pathMap.login)
  }

  function navigateToForgotPassword() {
    navigateTo(pathMap.forgotPassword)
  }
  
  function navigateToDonation() {
    navigateTo(pathMap.donation)
  }

  function navigateToAlumniList() {
    navigateTo(pathMap.alumniList)
  }

  function navigateToAlumniAssociationList() {
      navigateTo(pathMap.alumniAssociationList)
  }

  function navigateToAlumniAndAlumniAssociationList() {
    navigateTo(pathMap.alumniAndAlumniAssociationList)
  }

  function navigateToAlumniDetail() {
    navigateTo(pathMap.alumniDetail)
  }

  function navigateToAlumniAssociationDetail() {
    navigateTo(pathMap.alumniAssociationDetail)
  }

  function navigateToDynamic() {
    navigateTo(pathMap.dynamic)
  }

  function navigateToDynamicDetail(item) {
    navigateTo(pathMap.dynamicDetail, { id: item.id })
  }

  function navigateToActivityDetail(item) {
    navigateTo(pathMap.alumniActivityDetail, { id: item.id })
  }

  function navigateToAlumniActivities() {
    navigateTo(pathMap.alumniActivities)
  }

  function navigateToAlumniEnterprise(item) {
    navigateTo(pathMap.alumniEnterprise)
  }

  function navigateToAlumniActivityRegistration(item) {
    navigateTo(pathMap.alumniActivityRegistration, { id: item.id })
  }

  function navigateToAlumniEnterpriseDetail(item) {
    navigateTo(pathMap.alumniEnterpriseDetail, { id: item.id })
  }

  function navigateToSupplyAndDemandDetail(item) {
    navigateTo(pathMap.supplyAndDemandDetail, { id: item.id })
  }

  function navigateToProductDetail(item) {
    navigateTo(pathMap.productDetail, { id: item.id })
  }

  function navigateToPostDemandAndSupply() {
    navigateTo(pathMap.postDemandAndSupply)
  }

  function navigateToShoppingCart() {
    navigateTo(pathMap.shoppingCart)
  }

  function navigateToConfirmOrder() {
    navigateTo(pathMap.confirmOrder)
  }

  function navigateToAddDeliveryAddress(arg = {}) {
    navigateTo(pathMap.addDeliveryAddress, { ...arg })
  }

  function navigateToDeliveryAddress(arg = {}) {
    navigateTo(pathMap.deliveryAddress, { ...arg })
  }

  function navigateToPayment(arg = {}) {
    navigateTo(pathMap.payment, { ...arg })
  }

  function navigateToPaymentResult(arg = {}) {
    navigateTo(pathMap.paymentResult, { ...arg })
  }

  function navigateToMyOrdersDetail(item = {}) {
    navigateTo(pathMap.myOrdersDetail, { id: item.id })
  }

  function navigateToShipmentTracking() {
  }

  function navigateToAlumniEnterpriseCertification() {
    navigateTo(pathMap.alumniEnterpriseCertification)
  }

  function navigateToAlumniCertificationTips() {
    navigateTo(pathMap.alumniCertificationTips)
  }

  function navigateToAlumniCertification() {
    navigateTo(pathMap.alumniCertification)
  }

  function navigateToAuthenticationMethods() {
    navigateTo(pathMap.authenticationMethods)
  }

  function navigateToStudentIdVerification() {
    navigateTo(pathMap.studentIdVerification)
  }

  function navigateToCustomerAuthentication() {
    navigateTo(pathMap.customerAuthentication)
  }

  function navigateToJobPositions(item) {
    navigateTo(pathMap.jobPositions, { id: item.id })
  }

  return {
    pathMap,
    joinUrl,
    navigateTo,
    //
    switchTabToIndex,
    navigateToRegister,
    navigateToLogin,
    navigateToForgotPassword,
    navigateToDonation,
    navigateToAlumniList,
    navigateToAlumniAssociationList,
    navigateToAlumniAndAlumniAssociationList,
    navigateToAlumniDetail,
    navigateToAlumniAssociationDetail,
    switchTabToShop,
    navigateToDynamic,
    navigateToDynamicDetail,
    navigateToActivityDetail,
    navigateToAlumniActivities,
    navigateToAlumniEnterprise,
    navigateToAlumniActivityRegistration,
    navigateToAlumniEnterpriseDetail,
    navigateToSupplyAndDemandDetail,
    navigateToProductDetail,
    navigateToPostDemandAndSupply,
    navigateToShoppingCart,
    navigateToConfirmOrder,
    navigateToAddDeliveryAddress,
    navigateToDeliveryAddress,
    navigateToPayment,
    navigateToPaymentResult,
    navigateToMyOrdersDetail,
    navigateToShipmentTracking,
    navigateToAlumniEnterpriseCertification,
    navigateToAlumniCertification,
    navigateToAlumniCertificationTips,
    navigateToStudentIdVerification,
    navigateToCustomerAuthentication,
    navigateToAuthenticationMethods,
    navigateToJobPositions
  }
}
