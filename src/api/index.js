import axios from 'axios'
import Vue from 'vue'
// import http from '../api'
// import router from '@/router'

const _TIMEOUT_ = 15000

axios.interceptors.response.use(response => {
  return response
}, error => {
  Vue.prototype.$popupTop('出错了，请重试')
  // if (error.response.status === 401) {
  //   token无效，重新登录
  //   if (error.response.data.Code === 100010) {
  //     sessionStorage.removeItem('userAccount')
  //     http.get(`/ShopInfo?host=${window.location.host}`).then(res => {
  //       if (res.data.Code === 100000) {
  //         window.location.href = res.data.Data.LoginUrl
  //       }
  //     })
  //   }
  // } else {
  //   Vue.$vux.toast.hide()
  // }
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
