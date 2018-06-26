import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 用户端-管家
const servant = () => import('@/views/servant/servant')
const servantDetail = () => import('@/views/servant/detail/index')
const servantService = () => import('@/views/servant/detail/service')
const servantItem = () => import('@/views/servant/detail/item')
const servantPackage = () => import('@/views/servant/detail/package')
const servantChat = () => import('@/views/servant/chat')

// 支付
const pay = () => import('@/views/servant/pay.vue')

// 用户端-服务
const service = () => import('@/views/service/service')
const serviceList = () => import('@/views/service/service-list')
const serviceReserve = () => import('@/views/service/service-reserve')
const serviceDetail = () => import('@/views/service/service-detail.vue')
const serviceIn = () => import('@/views/service/service-in.vue')
const serviceComplaint = () => import('@/views/service/service-complaint.vue')

// 用户端-健康
const health = () => import('@/views/health/health')

// 用户端-我的
const user = () => import('@/views/user/user')
const userInfo = () => import('@/views/user/user-info')
const userPhone = () => import('@/views/user/user-phone')
const userAddress = () => import('@/views/user/user-address')
const userOrder = () => import('@/views/user/user-order')
const userComplaint = () => import('@/views/user/user-complaint')
const userComplaintDetail = () => import('@/views/user/user-complaint-detail')

// 微信登录
const wxLogin = () => import('@/views/wxlogin/login')

const addFriends = () => import('@/views/wxlogin/addFriends')

// 结果页
const resultsComplaint = () => import('@/views/resultsPage/complaint')
const paySuccess = () => import('@/views/resultsPage/paySuccess')
const payCancel = () => import('@/views/resultsPage/cancel')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (!/^\/servant\/chat\//.test(to.path)) {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/User/Login',
      component: wxLogin
    },
    {
      path: '/addFriends',
      component: addFriends
    },
    {
      path: '/servant/pay/:id',
      component: pay
    },
    {
      path: '/',
      redirect: '/servant'
    },
    {
      path: '/servant',
      component: servant
    },
    {
      path: '/servant/detail',
      component: servantDetail,
      children: [{
        path: 'item/:id',
        component: servantItem
      }, {
        path: 'package/:id',
        component: servantPackage
      }]
    },
    {
      path: '/servant/service/:id',
      component: servantService
    },
    {
      path: '/servant/chat/:id',
      component: servantChat
    },
    {
      path: '/service',
      component: service
    },
    {
      path: '/service/in/:id',
      component: serviceIn
    },
    {
      path: '/service/complaint/:id',
      component: serviceComplaint
    },
    {
      path: '/service/reserve/:id',
      component: serviceReserve
    },
    {
      path: '/service/list/:id',
      component: serviceList
    },
    {
      path: '/service/detail/:id',
      component: serviceDetail
    },
    {
      path: '/health',
      component: health
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/user/info',
      component: userInfo
    },
    {
      path: '/user/phone',
      component: userPhone
    },
    {
      path: '/user/address',
      component: userAddress
    },
    {
      path: '/user/order',
      component: userOrder
    },
    {
      path: '/user/complaint',
      component: userComplaint
    },
    {
      path: '/user/complaint/:id',
      component: userComplaintDetail
    },
    {
      path: '/result/complaint',
      component: resultsComplaint
    },
    {
      path: '/result/paySuccess',
      component: paySuccess
    },
    {
      path: '/result/payCancel',
      component: payCancel
    }
  ]
})

router.beforeEach((to, from, next) => {
  router.app.$store.commit('SET_ROUTER_LOADING', true)
  const userAccount = JSON.parse(sessionStorage.getItem('userAccount')) || {}
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
  // 微信授权登录
  if (!userAccount.ID && window.location.pathname !== '/User/Login') {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.wechatOption.appId}&redirect_uri=` +
    encodeURIComponent(process.env.wechatOption.redirectUrl) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    sessionStorage.setItem('to_path', to.fullPath)
    return false
  }

  // 加好友
  if (to.path === '/addFriends') {
    next()
    return false
  }

  // 手机认证
  if (userAccount.ID && !userInfo.Mobile && to.path !== '/user/phone') {
    router.replace('/user/phone')
    return false
  }
  // 实名认证
  if (userAccount.ID && userInfo.Mobile && !userInfo.IDCard && to.path !== '/user/info') {
    router.replace('/user/info')
    return false
  }
  next()
})
router.afterEach(() => {
  store.commit('SET_ROUTER_LOADING', false)
})

export default router
