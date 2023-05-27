<script setup>
  import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
  import { useRegister } from '@/service/auth'
  const { form, formRef, submit, rules } = useRegister()

  onReady(() => {
    formRef.value.setRules(rules)
  })
  function save() {
    formRef.value.validate(async valid => {
      if (valid) {
        await submit()
        uni.$u.toast('注册成功')
        uni.navigateBack({
          delta: 1
        })
      }
      console.log(form, 'form')
    })
  }
</script>
<template>
  <view class="register aa-container">
    <u-form :model="form" ref="formRef">
      <u-form-item label-width="auto" label="手机号" prop="phone">
        <u-input v-model="form.phone" clearable placeholder="请输入手机号" />
      </u-form-item>
      <u-form-item label-width="auto" label="密码" prop="password">
        <u-input v-model="form.password" clearable placeholder="请输入密码" />
      </u-form-item>
      <u-form-item label-width="auto" label="确认密码" prop="confirmPassword">
        <u-input v-model="form.confirmPassword" clearable placeholder="请确认密码" />
      </u-form-item>
    </u-form>
    <aa-fixed-bottom-primary-btn @click="save">提交</aa-fixed-bottom-primary-btn>
  </view>
</template>

<style scoped lang="scss">
  .register {
  }
</style>
