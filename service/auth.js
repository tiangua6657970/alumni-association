import { post } from '@/service/base'
import { reactive, ref } from 'vue'
import { getFormRules } from '@/common/utils'
import { paths } from '@/service/path-map'

export const register = data => post(paths.register, data)
export const login = data => post(paths.login, data)

export function useRegister() {
  const formRef = ref()
  const form = reactive({
    phone: '18174102647',
    password: '123456',
    confirmPassword: '123456'
  })
  const { rules } = getFormRules(form, ['phone', 'confirmPassword', 'password'])
  async function submit(callback) {
    form.mobile = form.phone
    await register(form)
    callback && callback()
  }
  return {
    formRef,
    rules,
    form,
    submit
  }
}
export function useLogin() {
  const formRef = ref()
  const form = reactive({
    phone: '18174102647',
    code: '',
    password: '123456',
    acceptLicense: false
  })
  const { rules } = getFormRules(form, ['phone', 'code', 'password'])
  async function submit(callback) {
    form.mobile = form.phone
    form.verifyCode = form.code
    callback && callback()
    return await login(form)
  }
  return {
    formRef,
    form,
    rules,
    submit
  }
}