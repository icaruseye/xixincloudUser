import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 用户端-管家
const servant = () => import('@/views/servant/servant')
const servantDetail = () => import('@/views/servant/servant-detail')
const servantChat = () => import('@/views/servant/chat')
const servantPackageDetail = () => import('@/views/servant/servant-package-detail')
const servantPackageList = () => import('@/views/servant/servant-package-list')

// 用户端-服务
const service = () => import('@/views/service/service')
const serviceList = () => import('@/views/service/service-list')
const serviceReserve = () => import('@/views/service/service-reserve')
const serviceDetail = () => import('@/views/service/service-detail.vue')

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
      path: '/servant/detail/:id',
      component: servantDetail
    },
    {
      path: '/servant/packageList/:id',
      component: servantPackageList
    },
    {
      path: '/servant/packageDetail/:id',
      component: servantPackageDetail
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
  const token = localStorage.getItem('user_token')
  localStorage.setItem('to_path', from.path)
  console.log(store.state)
  if (!token && to.path !== '/User/Login') {
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef2a7d894732658e&redirect_uri=' +
    // encodeURIComponent('http://xxx.xixincloud.com/Servant/Login?shopID=666') + '&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    // window.location.href = '/Servant/Login'
    next('/User/Login?id=3')
  } else {
    next()
  }
})

export default router
