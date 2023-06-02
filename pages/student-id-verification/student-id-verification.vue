<script setup>
  import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
  import { reactive, ref } from 'vue'
  import { getFormRules } from '@/common/utils'
  const formRef = ref()
  const marginTop = ref(0)
  const form = reactive({
    name: '',
    majorField: '',
    studentId: '',
    id: '',
    idCardCopy: ''
  })
  const { rules } = getFormRules(form, ['name', 'majorField', 'studentId', 'id', 'idCardCopy'])
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
  <view class="student-id-verification">
    <aa-top-background navbar-title="学号认证" @updateRenderHeight="marginTop = $event">
      <aa-top-background__msg></aa-top-background__msg>
    </aa-top-background>
    <view class="aa-container container aa-fix-fixed-bottom-btn" :style="{ marginTop: marginTop + 'px' }">
      <u-form :model="form" ref="formRef">
        <u-form-item label-width="auto" label="姓名" prop="name">
          <u-input v-model="form.name" clearable placeholder="请输入姓名" />
        </u-form-item>
        <u-form-item label-width="auto" label="专业" prop="majorField">
          <u-input v-model="form.name" clearable placeholder="请输入专业" />
        </u-form-item>
        <u-form-item label-width="auto" label="学号" prop="studentId">
          <u-input v-model="form.name" clearable placeholder="请输入学号" />
        </u-form-item>
        <u-form-item label-width="auto" label="身份证号" prop="id">
          <u-input v-model="form.id" clearable placeholder="请输入身份证号" />
        </u-form-item>
        <u-form-item label="请上传身份证附件" label-position="top" prop="idCardCopy">
          <aa-upload-single-image />
        </u-form-item>
        <view class="aa-fix-fixed-bottom-btn"></view>
      </u-form>
    </view>
    <aa-fixed-bottom-primary-btn @click="save">提交</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  page {
    background-color: #f7f7f7;
  }

  .student-id-verification {
  }
  .container {
    margin-top: 212rpx;
    background-color: #fff;
  }
</style>
