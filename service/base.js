import { __token__ } from '@/common/keys'
import { isMock } from '@/common/env'

export const serverConfig = {
  baseUrl: '',//isMock ? 'https://mock.apifox.cn/m1/2374747-0-default' : 'http://192.168.1.23:8091', // 请求的本域名 //
  method: 'POST',
  // 设置为json，返回后会对数据进行一次JSON.parse()
  dataType: 'json',
  showLoading: true, // 是否显示请求中的loading
  loadingText: '请求中...', // 请求loading中的文字提示
  loadingTime: 500, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
  originalData: false, // 是否在拦截器中返回服务端的原始数据
  loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
  // 配置请求头信息
  header: {
    'content-type': 'application/json;charset=UTF-8'
  }
}
uni.$u.http.setConfig(serverConfig)
uni.$u.http.interceptor.request = config => {
  config.header = {
    Authorization: uni.getStorageSync(__token__)
  }
  return config
}

uni.$u.http.interceptor.response = config => {
  // ......
  return config
}

export function request(url, params = {}, requestMethod = 'GET', config = {}) {
  return uni.$u.http
    .request({
      url,
      method: requestMethod,
      data: params,
      ...config
    })
    .then(res => {
      if (res.code !== 200) {
        return { err: 1, data: undefined }
      } else return { err: undefined, data: res.data }
    })
    .catch(err => {
      console.log('[service err] :', err)
      return { err: 1, data: undefined }
      // throw 'service err'
    })
}

export function get(url, params) {
  return request(url, params)
}

export function post(url, data) {
  return request(url, data, 'POST')
}
export function put(url, data) {
  return request(url, data, 'PUT')
}