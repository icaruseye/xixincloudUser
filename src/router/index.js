import Vue from 'vue'
import Router from 'vue-router'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 用户端-管家
const servant = () => import('@/views/servant/servant')
const servantDetail = () => import('@/views/servant/detail/index')
const servantService = () => import('@/views/servant/detail/service')
const servantItem = () => import('@/views/servant/detail/item')
const servantPackage = () => import('@/views/servant/detail/package')
const servantChat = () => import('@/views/servant/chat')

// 用户端-服务
const service = () => import('@/views/service/service')
const serviceList = () => import('@/views/service/service-list')
const serviceReserve = () => import('@/views/service/service-reserve')
const serviceDetail = () => import('@/views/service/service-detail.vue')
const serviceIn = () => import('@/views/service/service-in.vue')

// 用户端-健康
const health = () => import('@/views/health/health')

// 用户端-我的
const user = () => import('@/views/user/user')
const userInfo = () => import('@/views/user/user-info')
const userPhone = () => import('@/views/user/user-phone')
const userAddress = () => import('@/views/user/user-address')
const userAddressEdit = () => import('@/views/user/user-address-edit')
const userOrder = () => import('@/views/user/user-order')

const wxLogin = () => import('@/views/wxlogin/login')

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
        path: 'service/:id',
        component: servantService
      }, {
        path: 'item/:id',
        component: servantItem
      }, {
        path: 'package/:id',
        component: servantPackage
      }]
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
      path: '/user/address/edit/:id',
      component: userAddressEdit
    },
    {
      path: '/user/order/',
      component: userOrder
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 微信授权登录
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
  if (!userInfo.ID && to.path !== '/User/Login') {
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef2a7d894732658e&redirect_uri=' +
    // encodeURIComponent('http://xxx.xixincloud.com/Servant/Login?shopID=666') + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    // window.location.href = '/Servant/Login'
    sessionStorage.setItem('to_path', to.fullPath)
    next('/User/Login?id=2')
    return false
  }
  next()
})

export default router
