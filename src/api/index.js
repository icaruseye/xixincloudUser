import axios from 'axios'
import Vue from 'vue'
import { ConfirmPlugin } from 'vux'
// import router from '@/router'

Vue.use(ConfirmPlugin)
const _TIMEOUT_ = 15000

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    // token无效，重新登录
    if (error.response.data.Code === 100010) {
      Vue.$vux.confirm.show({
        showCancelButton: false,
        confirmText: '刷新',
        content: '登录失效,请重试',
        onConfirm () {
          sessionStorage.removeItem('userAccount')
          window.location.reload()
        }
      })
    }
  } else {
    Vue.prototype.$popupTop('出错了，请重试')
    Vue.$vux.toast.hide()
  }
  return Promise.reject(error)
})

export default {
  post (url, data, header) {
    var token = localStorage.getItem('user_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (header) {
      var _headers = Object.assign(headers, header)
    }
    if (token) {
      headers.token = token
    }
    var options = {
      method: 'post',
      url: process.env.API_PATH + url,
      data: data,
      timeout: _TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options)
  },
  put (url, data, header) {
    var token = localStorage.getItem('user_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (header) {
      var _headers = Object.assign(headers, header)
    }
    if (token) {
      headers.token = token
    }
    var options = {
      method: 'put',
      url: process.env.API_PATH + url,
      data: data,
      timeout: _TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options)
  },
  delete (url, params) {
    var token = localStorage.getItem('user_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (token) {
      headers.token = token
    }
    return axios({
      method: 'delete',
      url: process.env.API_PATH + url,
      params,
      timeout: 15000,
      headers: headers
    })
  },
  get (url, params) {
    var token = localStorage.getItem('user_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (token) {
      headers.token = token
    }
    return axios({
      method: 'get',
      url: process.env.API_PATH + url,
      params,
      timeout: 15000,
      headers: headers
    })
  },
  send (url, method, data, header) {
    var token = localStorage.getItem('user_token')
    var headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    if (header) {
      var _headers = Object.assign(headers, header)
    }
    if (token) {
      headers.token = token
    }
    var options = {
      method: method,
      url: process.env.API_PATH + url,
      data: data,
      timeout: _TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options)
  }
}
