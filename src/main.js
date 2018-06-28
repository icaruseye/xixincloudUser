// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store/index'
import './plugins/validate.js'
import registryPopup from './components/common/popupTop/index'
import { DatetimePlugin, ToastPlugin } from 'vux'
import xxComponents from './components/common'
import http from '@/api'

Vue.use(xxComponents)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(registryPopup)
FastClick.attach(document.body)
Vue.prototype.$http = http

Vue.filter('transformImgUrl', function (val) {
  if (!val) return
  if (val.indexOf('http') === -1) {
    if (val.indexOf('Upload') === -1) {
      // 值为id
      return 'http://xixincloud.com:6883/File/GetImage/' + val
    } else {
      // 第三种情况
      return val
    }
  }
  // 值为完整url
  return val
})

Vue.filter('timeFormat', function (value = '') {
  let lastIndexOf = value.lastIndexOf('.')
  if (lastIndexOf > 0) {
    value = value.replace('T', ' ').substring(0, lastIndexOf)
  } else {
    value = value.replace('T', ' ')
  }
  return value
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
