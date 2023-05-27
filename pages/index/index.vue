<script setup>
  import { onLoad, onShow } from '@dcloudio/uni-app'
  import { ref } from 'vue'
  import useNavigate from '@/common/hook/use-navigate'
  import AaGap from '@/components/base/aa-gap/aa-gap'
  import indexGrid1 from '@/static/images/index/index-grid(1).png'
  import indexGrid2 from '@/static/images/index/index-grid(2).png'
  import indexGrid3 from '@/static/images/index/index-grid(3).png'
  import indexGrid4 from '@/static/images/index/index-grid(4).png'
  import indexGrid5 from '@/static/images/index/index-grid(5).png'
  import indexGrid6 from '@/static/images/index/index-grid(6).png'
  import indexGrid7 from '@/static/images/index/index-grid(7).png'
  import indexGrid8 from '@/static/images/index/index-grid(8).png'
  import { getIndexData } from '@/service'
  import { useDynamicList, useDynamicListCategoryList } from '@/service/dynamic'
  import { useActivityList } from '@/service/alumni-activities'
  import usePersonalCenterStore from '@/stores/personal-center'
  import { refreshDeliveryAddressList } from '@/stores/delivery-address'
  const personalCenterStore = usePersonalCenterStore()
  const swiperList = ref([])
  const alumniEnterpriseList = ref([])
  const {
    navigateTo,
    pathMap,
    navigateToAlumniAndAlumniAssociationList,
    navigateToDynamic,
    navigateToDynamicDetail,
    navigateToActivityDetail,
    navigateToAlumniActivities,
    navigateToAlumniEnterprise,
    navigateToAlumniEnterpriseDetail
  } = useNavigate()
  const { refresh: refreshDynamicListCategoryList } = useDynamicListCategoryList()
  const { dynamicList, refresh: refreshDynamicList, setParams } = useDynamicList()
  const { activityList, refresh: refreshActivityList } = useActivityList()
  async function _getIndexData() {
    const { data } = await getIndexData({ phone: '18174102647' })
    return data || {}
  }

  async function refreshIndexData() {
    const { swiperList: _swiperList } = await _getIndexData()
    swiperList.value = _swiperList
  }

  onLoad(async () => {
    refreshIndexData()
    const dynamicListCategoryList = await refreshDynamicListCategoryList()
    const category = dynamicListCategoryList.find(item => item.name === '校友动态')
    if (category) {
      setParams({ cateId: category.id })
      refreshDynamicList()
    }
    refreshActivityList()
  })
  const indexNavGrid = [
    { name: '动态', icon: indexGrid1, path: pathMap.dynamic },
    { name: '校友活动', icon: indexGrid2, path: pathMap.alumniActivities },
    { name: '校友企业', icon: indexGrid3, path: pathMap.alumniEnterprise },
    { name: '新生频道', icon: indexGrid4, path: '' },
    { name: '四百计划', icon: indexGrid5, path: '' },
    { name: '校园招聘', icon: indexGrid6, path: '' },
    { name: '校友捐赠', icon: indexGrid7, path: '' },
    { name: '国际校友', icon: indexGrid8, path: '' }
  ]

  function handleSwiperItemClick(index) {
    navigateTo(pathMap[swiperList.value[index].routeName])
  }
  
  function handleGridItemClick(item) {
    if (!item.path) return uni.$u.toast('功能还未开发')
    navigateTo(item.path)
  }
  
</script>
<template>
  <view class="index">
    <u-navbar
      :is-back="false"
      title=""
      :background="{ background: 'linear-gradient(45deg, rgba(18, 118, 198, 1), rgb(136, 163, 255))' }"
    >
      <template #default>
        <view class="header" @click="navigateToAlumniAndAlumniAssociationList">
          <u-icon :size="36" name="search" color="#fff" label-color="#fff" label="南宁校友会" />
        </view>
      </template>
    </u-navbar>
    <aa-swiper :list="swiperList" @itemClick="handleSwiperItemClick"/>
    <aa-grid :list="indexNavGrid" @itemClick="handleGridItemClick" />
    <aa-gap />
    <aa-list-top title="校友动态" @moreClick="navigateToDynamic" />
    <aa-content-list
      :list="dynamicList"
      title="校友动态"
      type="rightCover"
      @itemClick="navigateToDynamicDetail"
      @moreClick="navigateToDynamic"
    />
    <aa-gap />
    <aa-list-top title="校友活动" @moreClick="navigateToAlumniActivities" />
    <aa-content-list
      :list="activityList"
      title="校友活动"
      type="leftCover"
      show-status
      @itemClick="navigateToActivityDetail"
      @moreClick="navigateToAlumniActivities"
    />
    <aa-gap />
    <aa-list-top title="校友企业" @moreClick="navigateToAlumniEnterprise" />
    <aa-alumni-company-list
      :list="alumniEnterpriseList"
      title="校友企业"
      @itemClick="navigateToAlumniEnterpriseDetail"
      @moreClick="navigateToAlumniEnterprise"
    />
    <aa-gap />
  </view>
</template>

<style scoped lang="scss">
  .index {
    background-color: #f7f7f7;
  }
  .header {
    padding: 0 30rpx;
  }

  .u-grid {
    background-color: #ffffff;
  }
</style>
