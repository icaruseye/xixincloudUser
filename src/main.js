// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store/index'
import './plugins/validate.js'
import registryPopup from './components/common/popupTop/index'
import { DatetimePlugin, ToastPlugin, XDialog, ConfirmPlugin, LoadingPlugin, BusPlugin } from 'vux'
import xxComponents from './components/common'
import http from '@/api'
import util from '@/plugins/util'
// import VueLazyload from 'vue-lazyload'

Vue.use(xxComponents)
Vue.use(DatetimePlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(registryPopup)
Vue.use(LoadingPlugin)
Vue.use(BusPlugin)
Vue.component('x-dialog', XDialog)

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'https://img3.doubanio.com/icon/u113894409-4.jpg',
//   loading: '/src/assets/images/chat-loading.gif',
//   attempt: 1
// })

FastClick.attach(document.body)
Vue.prototype.$http = http

Vue.filter('transformImgUrl', function (val) {
  return util.transformImgUrl(val)
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
