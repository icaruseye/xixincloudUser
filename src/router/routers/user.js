import _import from '../_import'

export default [
  {
    path: '/user',
    component: _import('/user/user'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/user/info',
    component: _import('/user/user-info'),
    meta: {
      title: '个人资料'
    }
  },
  {
    path: '/user/phone',
    component: _import('/user/user-phone'),
    meta: {
      title: '我的手机'
    }
  },
  {
    path: '/user/address',
    component: _import('/user/user-address'),
    meta: {
      title: '我的地址'
    }
  },
  {
    path: '/user/order',
    component: _import('/user/user-order'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/user/complaint',
    component: _import('/user/user-complaint'),
    meta: {
      title: '我的投诉'
    }
  },
  {
    path: '/user/complaint/:id',
    component: _import('/user/user-complaint-detail'),
    meta: {
      title: '投诉详情'
    }
  },
  {
    path: '/user/recommend',
    component: _import('/user/user-recommend'),
    meta: {
      title: '推荐'
    }
  }
]
