import { joinUrl } from '@/common/navigates'

export function getFormRules(form, extract = []) {
  const placeholders = {
    title: '请输入标题',
    name: '请输入姓名',
    placeholderType: '请选择类型',
    placeholderIndustry: '请选择行业',
    paragraph: '请输入说明',
    majorField: '请输入专业',
    studentId: '请输入学号',
    id: '请输入身份证号',
    idCardCopy: '请上传身份证附件',
    phone: '请输入手机号',
    email: '请输入邮箱地址',
    placeholderAddress: '请选择地址',
    placeholderValidTime: '请输入有效时间',
    code: '请输入验证码',
    password: '请输入密码',
    confirmPassword: '请确认密码',
    newPassword: '请输入新密码',
    oldPassword: '请确认新密码'
  }

  const rules = {
    title: [
      {
        required: true,
        message: placeholders.title,
        trigger: ['blur']
      }
    ],
    name: [
      {
        required: true,
        message: placeholders.name,
        trigger: ['blur']
      }
    ],
    placeholderType: [
      {
        required: true,
        message: placeholders.placeholderType,
        trigger: ['blur']
      }
    ],
    placeholderIndustry: [
      {
        required: true,
        message: placeholders.placeholderIndustry,
        trigger: ['blur']
      }
    ],
    paragraph: [
      {
        required: true,
        message: placeholders.paragraph,
        trigger: ['blur']
      }
    ],
    majorField: [
      {
        required: true,
        message: placeholders.majorField,
        trigger: ['blur']
      }
    ],
    studentId: [
      {
        required: true,
        message: placeholders.studentId,
        trigger: ['blur']
      }
    ],
    id: [
      {
        required: true,
        message: placeholders.id,
        trigger: ['blur']
      }
    ],
    idCardCopy: [
      {
        required: true,
        message: placeholders.idCardCopy,
        trigger: ['blur']
      }
    ],
    phone: [
      {
        required: true,
        message: placeholders.phone,
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
        message: placeholders.email,
        trigger: ['blur']
      }
    ],
    placeholderAddress: [
      {
        required: true,
        message: placeholders.placeholderAddress,
        trigger: ['blur']
      }
    ],
    placeholderValidTime: [
      {
        required: true,
        message: placeholders.placeholderValidTime,
        trigger: ['blur']
      }
    ],
    code: [
      {
        required: true,
        message: placeholders.code,
        trigger: ['blur']
      }
    ],
    password: [
      {
        required: true,
        message: placeholders.password,
        trigger: ['blur']
      }
    ],
    confirmPassword: [
      {
        required: true,
        message: placeholders.confirmPassword,
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
        message: placeholders.newPassword,
        trigger: ['blur']
      }
    ],
    oldPassword: [
      {
        required: true,
        message: placeholders.oldPassword,
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
  const rulesResult = {}

  extract.forEach(item => {
    if (item instanceof Object) {
      const name = item.name
      rulesResult[name] = rules[name]
      if (item.message instanceof Array && item.message.length) {
        for (let i = 0; i < item.message.length; i++) {
          if (!rulesResult[item.name][i]) {
            console.error(`[getFormRules: error]`, '该规则没有索引  ', i)
            return
          }
          if (rulesResult[name][i]) {
            placeholders[name] = rulesResult[name][i].message = item.message[i]
          }
        }
      } else {
        placeholders[name] = rulesResult[name][0].message = item.message || rulesResult[name][0].message
      }
    } else {
      rulesResult[item] = rules[item]
    }
  })
  return {
    rules: rulesResult,
    placeholders: placeholders
  }
}

export function getCurrentPath() {
  const pages = getCurrentPages()
  const { route: path, options: params } = pages[pages.length - 1]
  return joinUrl(path, params)
}
