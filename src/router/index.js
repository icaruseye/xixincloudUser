import Vue from 'vue'
import Router from 'vue-router'
import routerList from './routerList'
import store from '../store'
import { ToastPlugin } from 'vux'
import http from '../api'

Vue.use(ToastPlugin)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (!/^\/message\/chat\//.test(to.path)) {
      return { x: 0, y: 0 }
    }
  },
  routes: routerList
})

router.beforeEach((to, from, next) => {
  router.app.$store.commit('SET_ROUTER_LOADING', true)
  const userAccount = JSON.parse(sessionStorage.getItem('userAccount')) || {}
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 微信授权登录
  if (!userAccount.ID && window.location.pathname !== '/wxLogin') {
    http.get(`/ShopInfo?host=${window.location.host}`).then(res => {
      if (res.data.Code === 100000) {
        sessionStorage.setItem('to_path', to.fullPath)
        window.location.href = res.data.Data.LoginUrl
      }
    })
    return false
  }

  // 加好友
  if (to.path === '/addFriends') {
    next()
    return false
  }

  if (to.path.split('/')[2] === 'reserve' || to.path.split('/')[2] === 'consult') {
    // 手机认证
    if (userAccount.ID && !userInfo.Mobile && to.path !== '/user/phone') {
      router.push('/user/phone')
      return false
    }
    // 实名认证
    if (userAccount.ID && userInfo.Mobile && !userInfo.IDCard && to.path !== '/user/info') {
      router.push('/user/info')
      return false
    }
  }

  next()
})
router.afterEach((to, from, next) => {
  store.commit('SET_ROUTER_LOADING', false)
})

export default router
