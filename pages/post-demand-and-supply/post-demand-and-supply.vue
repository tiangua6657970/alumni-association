<script setup>
  import { onReady } from '@dcloudio/uni-app'
  import { reactive, ref, watch } from 'vue'
  import { getFormRules } from '@/common/utils'
  import { postDemandAndSupply } from '@/service/supply-and-demand'
  import useIndustryCategoryList from '@/service/common/use-industry-category-list'
  import { TYPE_LIST, TYPE_TEXT_MAP } from '@/common/constants'

  const form = reactive({
    title: '',
    type: 1,
    industry: '',
    address: [],
    addressLine: '',
    validTime: [],
    name: '',
    phone: '',
    paragraph: '',
    placeholderType: '',
    placeholderIndustry: '',
    placeholderAddress: '',
    placeholderValidTime: ''
  })
  const formRef = ref()
  const typeSelectorShow = ref(false)
  const industrySelectorShow = ref(false)
  const datetimeSelectorShow = ref(false)
  const locationPopupShow = ref(false)
  const datetimeSelectorParams = {
    year: true,
    month: true,
    day: true,
    hour: true,
    minute: true,
    second: false,
    timestamp: true
  }
  const addressSelectorShow = ref(false)
  const { rules, placeholders } = getFormRules(form, [
    'title',
    'placeholderType',
    'placeholderIndustry',
    'placeholderAddress',
    'placeholderValidTime',
    { name: 'name', message: '请输入联系人姓名' },
    { name: 'phone', message: '请输入联系人手机号' },
    { name: 'paragraph', message: '请输入供需说明' }
  ])
  const { industryCategoryList, refresh: refreshIndustryCategoryList } = useIndustryCategoryList()
  refreshIndustryCategoryList()
  onReady(() => {
    formRef.value.setRules(rules)
  })
  watch(industryCategoryList, newVal => console.log(newVal, 'nweVal'))

  function handleTypeSelectionConfirm(result) {
    const { value } = result[0]
    form.placeholderType = TYPE_TEXT_MAP[value]
    form.type = value
  }

  function handleIndustrySelectionConfirm(result) {
    form.placeholderIndustry = result.map(item => item.label).join('-')
    form.industry = result[result.length - 1].value
    // const index1 = industryTree.findIndex(item => item.value === result[0].value)
    // const index2 = industryTree[index1].children.findIndex(item => item.value === result[1].value)
    // const index3 = industryTree[index1].children[index2].children.findIndex(item => item.value === result[2].value)
    // industrySelectorDefaultIndexList.value = [index1, index2, index3]
  }

  function handleAddressSelectionConfirm(result) {
    console.log(result, 'result')
    const { province, city, area } = result
    form.placeholderAddress = `${province.name}-${city.name}-${area.name}`
    form.address = [province.code, city.code, area.code]
  }

  function handleDatetimeSelectionConfirm(result) {
    if (result.timestamp * 1000 - Date.now() < 0) {
      form.placeholderValidTime = ''
      uni.$u.toast('不能小于当前时间')
      return
    }
    const { year, month, day, hour, minute } = result
    form.placeholderValidTime = `${year}-${month}-${day} ${hour}:${minute}`
    form.validTime = [
      uni.$u.timeFormat(null, 'yyyy-mm-dd hh:MM:ss'),
      uni.$u.timeFormat(result.timestamp, 'yyyy-mm-dd hh:MM:ss')
    ]
  }

  function handleLocationSelectionConfirm(result) {
    console.log(result, 'result')
    const { currentAddress, currentAddressLine } = result
    form.placeholderAddress = currentAddress
    form.addressLine = currentAddressLine
  }

  function save() {
    formRef.value.validate(async valid => {
      if (valid) {
        const {
          title,
          name,
          phone: contact,
          address: region,
          addressLine: detailedRegion,
          validTime: time,
          industry: industryId,
          paragraph: illustrate,
          type
        } = form
        const res = await postDemandAndSupply({
          title,
          name,
          contact,
          region,
          detailedRegion,
          time,
          industryId,
          type,
          illustrate
        })
        if (res.err) {
          uni.$u.toast('发布失败')
          return
        }
        uni.$u.toast('发布成功')
        formRef.value.resetFields()
      }
    })
  }
</script>
<template>
  <view class="post-demand-and-supply aa-container">
    <u-form class="profile-form" :model="form" ref="formRef">
      <u-form-item label-width="auto" label="标题" prop="title">
        <u-input v-model="form.title" clearable :placeholder="placeholders.title" />
      </u-form-item>
      <u-form-item label-width="auto" label="类型：" prop="placeholderType">
        <u-input
          :model-value="form.placeholderType"
          :select-open="typeSelectorShow"
          type="select"
          clearable
          :placeholder="placeholders.placeholderType"
          @click="typeSelectorShow = true"
        />
      </u-form-item>
      <u-form-item label-width="auto" label="行业：" prop="placeholderIndustry">
        <u-input
          :model-value="form.placeholderIndustry"
          :select-open="industrySelectorShow"
          type="select"
          clearable
          :placeholder="placeholders.placeholderIndustry"
          @click="industrySelectorShow = true"
        />
      </u-form-item>
      <u-form-item label-width="auto" label="地址：" prop="placeholderAddress">
        <template #right>
          <u-icon
            name="map"
            label="定位"
            color="#1B80C4"
            label-color="#1B80C4"
            @click="locationPopupShow = true"
          />
        </template>
        <u-input
          v-model="form.placeholderAddress"
          :select-open="addressSelectorShow"
          type="select"
          clearable
          :placeholder="placeholders.placeholderAddress"
          @click="addressSelectorShow = true"
        />
      </u-form-item>
      <u-form-item label-width="auto" label="详细地址" prop="addressLine">
        <u-input v-model="form.addressLine" clearable placeholder="请输入详细地址" />
      </u-form-item>
      <u-form-item label-width="auto" label="有效时间至" prop="placeholderValidTime">
        <u-input
          :model-value="form.placeholderValidTime"
          :select-open="datetimeSelectorShow"
          type="select"
          clearable
          :placeholder="placeholders.placeholderValidTime"
          @click="datetimeSelectorShow = true"
        />
      </u-form-item>
      <u-form-item label-width="auto" label="联系人" prop="name">
        <u-input v-model="form.name" clearable :placeholder="placeholders.name" />
      </u-form-item>
      <u-form-item label-width="auto" label="联系人手机号" prop="phone">
        <u-input v-model="form.phone" clearable :placeholder="placeholders.phone" />
      </u-form-item>
      <u-form-item label-width="auto" label="供需说明：" prop="paragraph" label-position="top">
        <u-input
          v-model="form.paragraph"
          type="textarea"
          :height="300"
          clearable
          :placeholder="placeholders.paragraph"
        />
      </u-form-item>
    </u-form>
    <u-select v-model="typeSelectorShow" :list="TYPE_LIST" @confirm="handleTypeSelectionConfirm"></u-select>
    <u-select
      v-model="industrySelectorShow"
      :list="industryCategoryList"
      label-name="name"
      value-name="id"
      mode="mutil-column-auto"
      @confirm="handleIndustrySelectionConfirm"
    ></u-select>
    <u-picker
      v-model="datetimeSelectorShow"
      mode="time"
      :params="datetimeSelectorParams"
      @confirm="handleDatetimeSelectionConfirm"
    ></u-picker>
    <u-picker v-model="addressSelectorShow" mode="region" @confirm="handleAddressSelectionConfirm"></u-picker>
    <aa-location-selection-popup v-model="locationPopupShow" @confirm="handleLocationSelectionConfirm" />
    <aa-submit-button @click="save">保存</aa-submit-button>
  </view>
</template>

<style scoped lang="scss">
  .post-demand-and-supply {
  }

  .aa-submit-button {
    margin: 100rpx 0;
  }
</style>