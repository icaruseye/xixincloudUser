import axios from 'axios'
import config from '@/config'
import Vue from 'vue'
// import router from '@/router'

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    // token无效，重新登录
    if (error.response.data.Code === 100010) {
      sessionStorage.removeItem('userInfo')
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx08851399f06a2888&redirect_uri=' +
      // encodeURIComponent('http://user.xixincloud.com/User/Login?shopID=666') + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    }
  } else {
    Vue.prototype.$popupTop('出错了，请重试')
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
      url: config._PATH_ + url,
      data: data,
      timeout: config._TIMEOUT_,
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
      url: config._PATH_ + url,
      data: data,
      timeout: config._TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options)
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
      url: config._PATH_ + url,
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
      url: config._PATH_ + url,
      data: data,
      timeout: config._TIMEOUT_,
      headers: _headers || headers
    }
    return axios(options)
  }
}
