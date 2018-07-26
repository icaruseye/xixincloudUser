import _import from '../_import'

export default [
  {
    path: '/service',
    component: _import('/service/service'),
    meta: {
      title: '我的服务'
    }
  },
  {
    path: '/service/in/:id',
    component: _import('/service/service-in'),
    meta: {
      title: '任务详情'
    }
  },
  {
    path: '/service/complaint/:id',
    component: _import('/service/service-complaint'),
    meta: {
      title: '投诉'
    }
  },
  {
    path: '/service/reserve/:id',
    component: _import('/service/service-reserve'),
    meta: {
      title: '预约服务'
    },
    beforeRouteLeave (to, from, next) {
      // 预约认证流程，返回跳过认证页面
      if (to.path.substr(0, 11) !== '/service/in') {
        next('/service')
      }
    }
  },
  {
    path: '/service/consult/:id',
    component: _import('/service/service-consult/index'),
    meta: {
      title: '图文咨询'
    }
  }
  // {
  //   path: '/service/list/:id',
  //   component: _import('')
  // }
]
