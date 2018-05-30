// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store/index'
import './plugins/validate.js'
import registryPopup from './components/common/popup-top/index'

Vue.use(registryPopup)
FastClick.attach(document.body)

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

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
