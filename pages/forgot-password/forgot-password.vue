<script setup>
  import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
  import { reactive, ref } from 'vue'
  import { useCode } from '@/common/hook/use-code'
  import useNavigate from '@/common/hook/use-navigate'
  import { selectedAlumniList } from '@/stores/certification'
  import { getFormRules } from '@/common/utils'
  const formRef = ref()
  const form = reactive({
    phone: '',
    code: '',
    newPassword: '',
    oldPassword: '',
    acceptLicense: false
  })
  const { rules } = getFormRules(form,['phone','code','newPassword','oldPassword'])
  onReady(() => {
    formRef.value.setRules(rules)
  })
  const { tips, start, codeChange, uCodeRef, end, seconds, getCode } = useCode()
  const { navigateToAlumniCertificationTips } = useNavigate()
  function save() {
    formRef.value.validate(valid => {
      if (valid) {
        if (!form.acceptLicense) {
          uni.$u.toast('您还没有同意隐私协议')
          return
        }
        navigateToAlumniCertificationTips()
      }
      console.log(form, 'form')
    })
  }
</script>
<template>
  <view class="forgot-password">
    <view class="aa-container aa-bg-white">
      <u-form :model="form" ref="formRef">
        <u-form-item label-width="auto" label="手机号" prop="phone">
          <u-input v-model="form.phone" clearable placeholder="请输入手机号" />
        </u-form-item>
        <u-form-item label-width="auto" label="验证码" prop="code">
          <u-input v-model="form.code" clearable placeholder="请输入验证码" />
          <template #right
            ><view class="aa-font-desc-light" @click="getCode">{{ tips }}</view></template
          >
        </u-form-item>
        <u-form-item label-width="auto" label="新密码" prop="newPassword">
          <u-input v-model="form.newPassword" clearable placeholder="请输入新密码" />
        </u-form-item>
        <u-form-item label-width="auto" label="确认新密码" prop="oldPassword">
          <u-input v-model="form.oldPassword" clearable placeholder="请确认新密码" />
        </u-form-item>
      </u-form>
      <u-button class="mt-40 mb-20" type="primary" @click="save">确认修改</u-button>
      <aa-license root-class="mt-40" v-model="form.acceptLicense"/>
    </view>
    <u-verification-code
      :seconds="seconds"
      @end="end"
      @start="start"
      ref="uCodeRef"
      @change="codeChange"
    ></u-verification-code>
  </view>
</template>

<style scoped lang="scss">
  .forgot-password {
  }
</style>
