// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store/index'
import './plugins/validate.js'
import registryPopup from './components/common/popupTop/index'
import { DatetimePlugin, ToastPlugin, XDialog, ConfirmPlugin } from 'vux'
import xxComponents from './components/common'
import http from '@/api'

// 自定义组件
Vue.use(xxComponents)
// Vux组件
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(registryPopup)
Vue.component('x-dialog', XDialog)

FastClick.attach(document.body)
Vue.prototype.$http = http

Vue.filter('transformImgUrl', function (val) {
  if (!val) return
  if (val.indexOf('http') === -1) {
    if (val.indexOf('Upload') === -1) {
      // 值为id
      return `${process.env.IMG_PATH}/File/GetImage/${val}`
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
