<script setup>
  import { onReady } from '@dcloudio/uni-app'
  import { reactive, ref } from 'vue'
  import { getFormRules } from '@/common/utils'

  const formRef = ref()
  const marginTop = ref(0)
  const form = reactive({
    name: '',
    id: '',
    idCardCopy: ''
  })
  const { rules, placeholders } = getFormRules(form, ['name', 'id', 'idCardCopy'])
  onReady(() => {
    formRef.value.setRules(rules)
  })

  function save() {
    formRef.value.validate(valid => {
      if (valid) {
      }
      console.log(form, 'form')
    })
  }
</script>
<template>
  <view class="backend-authentication">
    <aa-top-background navbar-title="客服认证" @updateRenderHeight="marginTop = $event">
      <aa-top-background__msg></aa-top-background__msg>
    </aa-top-background>
    <view class="aa-container container" :style="{ marginTop: marginTop + 'px' }">
      <u-form :model="form" ref="formRef">
        <u-form-item label-width="auto" label="姓名" prop="name">
          <u-input v-model="form.name" clearable :placeholder="placeholders.name" />
        </u-form-item>
        <u-form-item label-width="auto" label="身份证号" prop="id">
          <u-input v-model="form.id" clearable :placeholder="placeholders.id" />
        </u-form-item>
        <u-form-item label="请上传身份证附件" label-position="top" prop="idCardCopy">
          <aa-upload-single-image />
        </u-form-item>
      </u-form>
      <view class="action-list">
        <view class="action-item">
          <view class="action-item__name"></view>
          <view class="action-item__content"></view>
        </view>
      </view>
    </view>
    <aa-fixed-bottom-primary-btn @click="save">下一步</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .backend-authentication {
  }

  .container {
    margin-top: 212rpx;
    background-color: #fff;
  }
</style>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>