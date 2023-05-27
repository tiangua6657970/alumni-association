import { isMock } from '@/common/env'

export const devPaths = {
  // 首页轮播图等数据
  indexData: '/api/index/index',

  // 活动相关
  activityList: '/api/activity/getList',
  alumniActivityDetail: '/api/activity/getDetail',
  activityRegistration: '/api/activity/application',
  myActivityList: '/api/activity/myActivity',
  activityCancelRegistration: '/api/activity/applicationStatus',

  // 动态相关
  dynamicListCategoryList: '/api/article/getCategoryList',
  dynamicList: '/api/article/getArticleList',
  dynamicDetail: '/api/article/getArticleDetail',

  // 供需相关
  industryCategoryList: '/api/supply/getIndustry',
  supplyAndDemandList: '/api/supply/getList',
  supplyAndDemandDetail: '/api/supply/getDetail',
  postDemandAndSupply: '/api/supply/addSupply',

  // 校友、校友会相关
  alumniAssociationList: '/api/alumniAssociation/selAlumniAssociation',
  alumniList: '',
  alumniAssociationDetail: '',
  alumniDetail: '',

  // 校友企业相关
  alumniEnterpriseList: '',
  alumniEnterpriseDetail: '',
  alumniEnterpriseJodList: '',
  alumniEnterpriseJodDetail: '',
  alumniEnterpriseSupplyAndDemandList: '',

  // 商城相关
  productList: '',
  productDetail: '',
  productReviewList: '',

  // 捐款相关
  donationDetail: '',
  donationRecords: '',
  expenditureDetailList: '',

  // 用户相关
  profile: '/api/user/getDetail',
  deliveryAddressList: '',
  orderList: '',
  orderDetail: '',
  paymentRecords:''
}
const mockPathPrefix = 'https://mock.apifox.cn/m1/2374747-0-default'
export const mockPaths = {
  // 首页轮播图等数据
  indexData: `${mockPathPrefix}/indexData`,

  // 活动相关
  activityList: `${mockPathPrefix}/activityList`,
  alumniActivityDetail: `${mockPathPrefix}/alumniActivityDetail`,
  myActivityList: `${mockPathPrefix}/activityList`,

  // 动态相关
  dynamicList: `${mockPathPrefix}/dynamicList`,
  dynamicDetail: `${mockPathPrefix}/dynamicDetail`,

  // 供需相关
  supplyAndDemandList: `${mockPathPrefix}/supplyAndDemandList`,
  supplyAndDemandDetail: `${mockPathPrefix}/supplyAndDemandDetail`,

  // 校友、校友会相关
  alumniAssociationList: `${mockPathPrefix}/alumniAssociationList`,
  alumniList: `${mockPathPrefix}/alumniList`,
  alumniAssociationDetail: `${mockPathPrefix}/alumniAssociationDetail`,
  alumniDetail: `${mockPathPrefix}/alumniDetail`,

  // 校友企业相关
  alumniEnterpriseList: `${mockPathPrefix}/alumniEnterpriseList`,
  alumniEnterpriseDetail: `${mockPathPrefix}/alumniEnterpriseDetail`,
  alumniEnterpriseJodList: `${mockPathPrefix}/alumniEnterpriseJodList`,
  alumniEnterpriseJodDetail: `${mockPathPrefix}/alumniEnterpriseJodDetail`,
  alumniEnterpriseSupplyAndDemandList: `${mockPathPrefix}/alumniEnterpriseSupplyAndDemandList`,

  // 商城相关
  productList: `${mockPathPrefix}/productList`,
  productDetail: `${mockPathPrefix}/productDetail`,
  productReviewList: `${mockPathPrefix}/productReviewList`,

  // 捐款相关
  donationDetail: `${mockPathPrefix}/donationDetail`,
  donationRecords: `${mockPathPrefix}/donationRecords`,
  expenditureDetailList: `${mockPathPrefix}/expenditureDetailList`,

  // 用户相关
  profile: `${mockPathPrefix}/profile`,
  deliveryAddressList: `${mockPathPrefix}/deliveryAddressList`,
  deliveryAddressDetail: `${mockPathPrefix}/deliveryAddressDetail`,
  orderList: `${mockPathPrefix}/orderList`,
  orderDetail: `${mockPathPrefix}/orderDetail`,
  paymentRecords: `${mockPathPrefix}/payment-records`
}

export const paths = isMock ? mockPaths : devPaths