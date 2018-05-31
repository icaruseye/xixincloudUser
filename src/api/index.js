import axios from 'axios'
import config from '@/config'
import Vue from 'vue'

axios.interceptors.response.use(response => {
  return response
}, error => {
  // if (error.response.status === 401) {
  //   console.log(100010)
  //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef2a7d894732658e&redirect_uri=' +
  //   encodeURIComponent('http://xxx.xixincloud.com/Servant/Login?shopID=666') + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
  // }
  Vue.prototype.$popupTop('出错了，请重试')
  console.log(error)
  return Promise.reject(error)
})

export default {
  post (url, data, header) {
    var token = localStorage.getItem('user_token')
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
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
  get (url, params) {
    var token = localStorage.getItem('user_token')
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8',
      'deviceType': 'WAP'
    }
    if (token) {
      headers.token = token
    }
    return axios({
      method: 'get',
      url: config._PATH_ + url,
      withCredentials: true,
      params,
      timeout: 15000,
      headers: headers
    })
  }
}
