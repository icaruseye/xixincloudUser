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

// 错误监控
var fundebug = require('fundebug-javascript')
fundebug.apikey = 'fdd5b0ab154e4073ecd3b140d5ac23948a53490af859fa0c0c9ddec70406ef62'

function formatComponentName (vm) {
  if (vm.$root === vm) return 'root'

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm)
  var propsData = vm.$options && vm.$options.propsData

  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  })
}

FastClick.attach(document.body)
Vue.prototype.$http = http
/**
 * 图片地址
 */
Vue.filter('transformImgUrl', function (val) {
  return util.transformImgUrl(val)
})
/**
 * 时间格式化
 */
Vue.filter('timeFormat', function (value = '') {
  let lastIndexOf = value.lastIndexOf('.')
  if (lastIndexOf > 0) {
    value = value.replace('T', ' ').substring(0, lastIndexOf)
  } else {
    value = value.replace('T', ' ')
  }
  return value
})
/**
 * 服务项图标
 */
Vue.filter('ItemImageByUseType', function (val = 1) {
  switch (val) {
    case 2:
      return require('@/assets/images/icon_picc2.png')
    case 3:
      return require('@/assets/images/icon_picc3.png')
    default:
      return require('@/assets/images/icon_picc.png')
  }
})
/**
 * 站内信分类图标
 */
Vue.filter('xxSiteNoticeIconFilter', (type = 1) => {
  switch (type) {
    case 2:
      return '#icon-dingdan1'
    case 4:
      return '#icon-icon_xitonggonggao'
    default:
      return '#icon-xiaoxi-xitongxiaoxi'
  }
})
/**
* 站内信分类标题
*/
Vue.filter('xxSiteNoticeTypeTitleFilter', (type = 1) => {
  switch (type) {
    case 2:
      return '订单消息'
    case 4:
      return '系统公告'
    default:
      return '系统消息'
  }
})
/**
 * 文字加省略号
 */
Vue.filter('xxTextTruncateFilter', (value = '', len = 10) => {
  return value.length > len ? value.substring(0, len) + '…' : value
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
