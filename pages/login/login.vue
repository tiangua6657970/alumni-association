<script setup>
  import { onReady } from '@dcloudio/uni-app'
  import { computed, ref } from 'vue'
  import {
    navigateToAlumniCertificationTips,
    navigateToForgotPassword,
    navigateToRegister
  } from '@/common/navigates'
  import { useCode } from '@/common/hook/use-code'
  import { useLogin } from '@/service/auth'
  import { __TOKEN__, __USERINFO__ } from '@/common/keys'
  import { refreshDeliveryAddressList, refreshProfileStore } from "@/stores/personal-center";
  import { isMock } from '@/common/env'

  const { formRef, form, rules, submit } = useLogin()
  const currentView = ref('codeLogin')
  const loginTabsStyle = computed(() => {
    if (currentView.value === 'codeLogin') {
      return {
        codeLoginStyle: {
          color: '#1B80C4'
        },
        passwordLoginStyle: {
          backgroundColor: '#ccc',
          color: '#fff',
          borderBottomLeftRadius: '40rpx',
          borderTopRightRadius: '24rpx'
        }
      }
    } else {
      return {
        codeLoginStyle: {
          backgroundColor: '#ccc',
          color: '#fff',
          borderTopLeftRadius: '24rpx',
          borderBottomRightRadius: '40rpx'
        },
        passwordLoginStyle: {
          color: '#1B80C4'
        }
      }
    }
  })
  onReady(() => {
    formRef.value.setRules(rules)
  })
  const { seconds, tips, uCodeRef, start, codeChange, end, getCode } = useCode()

  function save() {
    formRef.value.validate(async valid => {
      if (valid) {
        if (!form.acceptLicense) {
          uni.$u.toast('您还没有同意隐私协议')
          return
        }
        if (isMock) {
          uni.$u.toast('登录成功')
          refreshProfileStore()
          refreshDeliveryAddressList()
          navigateToAlumniCertificationTips()
        }
        const { err, data } = await submit()
        if (!err) {
          try {
            uni.setStorageSync(__TOKEN__, data.token)
            uni.setStorageSync(__USERINFO__, data.userInfo)
            uni.$u.toast('登录成功')
            refreshProfileStore()
            refreshDeliveryAddressList()
            navigateToAlumniCertificationTips()
          } catch (e) {
            // error
          }
        }
      }
    })
  }
</script>
<template>
  <view class="login">
    <aa-top-background :height="600" navbar-title="登录">
      <view class="top-background">
        <u-image src="@/static/images/logo-with-text.png" width="506" height="316"></u-image>
        <view class="aa-font-base-white mtb-30">欢迎来到桂林电子科技大学校友会</view>
      </view>
    </aa-top-background>
    <view class="container">
      <view class="login-tabs">
        <view class="code-login" :style="loginTabsStyle.codeLoginStyle" @click="currentView = 'codeLogin'"
          >验证码登录
        </view>
        <view
          class="password-login"
          :style="loginTabsStyle.passwordLoginStyle"
          @click="currentView = 'passwordLogin'"
          >密码登录
        </view>
      </view>
      <view class="aa-container">
        <u-form :model="form" ref="formRef">
          <u-form-item label-width="auto" label="手机号" prop="phone">
            <u-input v-model="form.phone" clearable placeholder="请输入手机号" />
          </u-form-item>
          <u-form-item label-width="auto" label="验证码" prop="code" v-if="currentView === 'codeLogin'">
            <u-input v-model="form.code" clearable placeholder="请输入验证码" />
            <template #right>
              <view class="aa-font-desc-light" @click="getCode">{{ tips }}</view>
            </template>
          </u-form-item>
          <u-form-item label-width="auto" label="密码" prop="password" v-if="currentView === 'passwordLogin'">
            <u-input v-model="form.password" clearable placeholder="请输入密码" />
          </u-form-item>
        </u-form>
        <view class="mt-40 mb-20">
          <u-button type="primary" @click="save">登录</u-button>
        </view>
        <view class="action">
          <view
            class="aa-font-desc-light"
            :class="{ hidden: currentView === 'codeLogin' }"
            @click="navigateToForgotPassword"
            >忘记密码？
          </view>
          <view class="aa-font-desc" @click="currentView = 'codeLogin'" v-if="currentView === 'passwordLogin'"
            >验证码登录
          </view>
          <view class="aa-font-desc" @click="currentView = 'passwordLogin'" v-if="currentView === 'codeLogin'"
            >密码登录
          </view>
        </view>
        <view class="action mt-30">
          <view class="aa-font-desc-light" @click="navigateToRegister">
            <text class="aa-font-desc">没有账号？</text>
            <text class="aa-font-desc-light">去注册</text>
          </view>
        </view>
        <aa-license class="mt-40" v-model="form.acceptLicense" />
      </view>
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
  .login {
  }

  .top-background {
    position: absolute;
    bottom: 30rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container {
    position: absolute;
    top: 570rpx;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
  }

  .login-tabs {
    display: flex;

    .code-login,
    .password-login {
      flex: 1;
      line-height: 80rpx;
      text-align: center;
    }

    .code-login {
    }

    .password-login {
    }
  }

  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hidden {
    visibility: hidden;
  }
</style>
