<script setup>
  import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
  import { useDeliveryAddressDetail } from '@/service/personal-center'
  import { ref } from 'vue'
  import { getFormRules } from '@/common/utils'
  import { refreshLocation } from '@/stores/location'
  const  props = defineProps({ id: String })
  const { deliveryAddressDetail, refresh } = useDeliveryAddressDetail(props)
  const formRef = ref()
  const addressSelectorShow = ref(false)
  const { rules: commonRules } = getFormRules(addressSelectorShow,['phone'])
  const rules = {
    receiverName: [
      {
        required: true,
        message: '请输入标题',
        trigger: ['blur']
      }
    ],
    receiverPhone: commonRules.phone,
    placeholderAddress: [
      {
        required: true,
        message: '请选择地址',
        trigger: ['blur']
      }
    ]
  }
  onLoad(options => {
    if (options.edit && options.id) {
      uni.setNavigationBarTitle({ title: '编辑收货地址' })
      refresh()
    } else {
    }
  })
  onReady(() => {
    formRef.value.setRules(rules)
  })
  function handlePosition() {
    refreshLocation()
  }
  function handleAddressSelectionConfirm(result) {
    deliveryAddressDetail.placeholderAddress = `${result.province.name}-${result.city.name}-${result.area.name}`
  }
  function save() {
    formRef.value.validate(valid => {
      if (valid) {
      }
      console.log(deliveryAddressDetail, 'form')
    })
  }
</script>
<template>
  <view class="add-delivery-address aa-container">
    <u-form :model="deliveryAddressDetail" ref="formRef">
      <u-form-item label-width="auto" label="收货人" prop="receiverName">
        <u-input v-model="deliveryAddressDetail.receiverName" clearable placeholder="请输入标题" />
      </u-form-item>
      <u-form-item label-width="auto" label="手机号：" prop="receiverPhone">
        <u-input v-model="deliveryAddressDetail.receiverPhone" maxlength="20" clearable placeholder="请输入手机号" />
      </u-form-item>
      <u-form-item label-width="auto" label="地址：" prop="placeholderAddress">
        <template #right>
          <u-icon name="map" label="定位" color="#1B80C4" label-color="#1B80C4" @click="handlePosition" />
        </template>
        <u-input
          v-model="deliveryAddressDetail.placeholderAddress"
          :select-open="addressSelectorShow"
          type="select"
          clearable
          placeholder="请选择地址"
          @click="addressSelectorShow = true"
        />
      </u-form-item>
      <u-form-item label-width="auto" label="详细地址" prop="addressLine">
        <u-input v-model="deliveryAddressDetail.shippingAddressLine" clearable placeholder="请输入详细地址" />
      </u-form-item>
      <u-form-item label-width="auto" label="设置为默认地址" prop="isDefault">
        <template #right>
          <u-switch v-model="deliveryAddressDetail.isDefault" />
        </template>
      </u-form-item>
    </u-form>
    <u-picker v-model="addressSelectorShow" mode="region" @confirm="handleAddressSelectionConfirm"></u-picker>
    <aa-fixed-bottom-primary-btn @click="save">保存</aa-fixed-bottom-primary-btn>
  </view>
</template>
<style scoped lang="scss">
  .add-delivery-address {
  }
</style>
