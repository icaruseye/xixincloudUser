import Vue from 'vue'
import Router from 'vue-router'
import routerList from './routerList'
import store from '../store'
import { ToastPlugin } from 'vux'
import http from '../api'

Vue.use(ToastPlugin)
Vue.use(Router)

// 新消息定时器
let newMsgTimer = null

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
  const u = navigator.userAgent
  const IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 修复iOS版微信HTML5 History兼容性问题
  if (IOS && to.path !== location.pathname && to.meta.share) {
    location.assign(to.fullPath)
    return false
  }

  // 不需要登陆直接访问目标页
  if (to.meta.noneedLogin) {
    next()
    return false
  }

  // 微信授权登录
  if (!userAccount.ID && window.location.pathname !== '/wxLogin') {
    sessionStorage.setItem('inviteParams', JSON.stringify(to.query))
    http.get(`/ShopInfo?host=${window.location.host}`).then(res => {
      if (res.data.Code === 100000) {
        sessionStorage.setItem('ShopInfo', JSON.stringify(res.data.Data))
        sessionStorage.setItem('to_path', to.fullPath)
        window.location.href = res.data.Data.LoginUrl
      }
    })
    return false
  }

  // 轮询新消息
  if (to.meta.isNeedGetNews) {
    if (!newMsgTimer) {
      newMsgTimer = setInterval(() => {
        store.dispatch('getHaveNewMsg')
      }, 5000)
    }
  } else {
    clearInterval(newMsgTimer)
    newMsgTimer = null
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
