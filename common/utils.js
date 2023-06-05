import { joinUrl } from "@/common/navigates";

export function getFormRules(form, extract = []) {
  const rules = {
    title: [
      {
        required: true,
        message: '请输入标题',
        trigger: ['blur']
      }
    ],
    name: [
      {
        required: true,
        message: '请输入姓名',
        trigger: ['blur']
      }
    ],
    majorField: [
      {
        required: true,
        message: '请输入专业',
        trigger: ['blur']
      }
    ],
    studentId: [
      {
        required: true,
        message: '请输入学号',
        trigger: ['blur']
      }
    ],
    id: [
      {
        required: true,
        message: '请输入身份证号',
        trigger: ['blur']
      }
    ],
    idCardCopy: [
      {
        required: true,
        message: '请上传身份证附件',
        trigger: ['blur']
      }
    ],
    phone: [
      {
        required: true,
        message: '请输入手机号',
        trigger: ['blur']
      },
      {
        required: true,
        validator: (rule, value, callback) => {
          return uni.$u.test.mobile(value)
        },
        message: '请输入合法的手机号',
        trigger: ['blur']
      }
    ],
    email: [
      {
        required: true,
        message: '请输入邮箱地址',
        trigger: ['blur']
      }
    ],
    placeholderAddress: [
      {
        required: true,
        message: '请选择地址',
        trigger: ['blur']
      }
    ],
    code: [
      {
        required: true,
        message: '请输入验证码',
        trigger: ['blur']
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['blur']
      }
    ],
    confirmPassword: [
      {
        required: true,
        message: '请确认密码',
        trigger: ['blur']
      },
      {
        required: true,
        validator: (rule, value, callback) => {
          return form.password === form.confirmPassword
        },
        message: '两次输入的密码不一致',
        trigger: ['blur']
      }
    ],
    newPassword: [
      {
        required: true,
        message: '请输入新密码',
        trigger: ['blur']
      }
    ],
    oldPassword: [
      {
        required: true,
        message: '请确认新密码',
        trigger: ['blur']
      },
      {
        required: true,
        validator: (rule, value, callback) => {
          return form.newPassword === form.oldPassword
        },
        message: '两次输入的密码不一致',
        trigger: ['blur']
      }
    ]
  }
  const result = {}
  extract.forEach(item => {
    result[item] = rules[item]
  })
  return {
    rules: result
  }
}

export function getCurrentPath() {
  const pages = getCurrentPages()
  const { route: path, options: params } = pages[pages.length - 1]
  return joinUrl(path,params)
}
