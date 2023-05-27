import { ref } from 'vue'

export function useCode() {
  const tips = ref('')
  const seconds = ref(60)
  const uCodeRef = ref()
  function end(ev) {
    console.log(ev, 'end')
  }

  function start(ev) {
    console.log(ev, 'start')
  }

  function codeChange(ev) {
    tips.value = ev
  }
  function getCode() {
    if (uCodeRef.value.canGetCode) {
      uni.showLoading({ title: '正在获取验证码' })
      setTimeout(() => {
        uni.hideLoading()
        uni.$u.toast('验证码已发送')
        uCodeRef.value.start()
      }, 2000)
    } else {
      uni.$u.toast('倒计时结束后再发送')
    }
  }
  return {
    tips,
    seconds,
    uCodeRef,
    start,
    end,
    codeChange,
    getCode
  }
}