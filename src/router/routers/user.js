import _import from '../_import'

export default [
  {
    path: '/user',
    component: _import('/user/user'),
    meta: {
      title: '我的',
      isNeedGetNews: true
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
  },
  {
    path: '/user/account',
    component: _import('/user/user-account'),
    meta: {
      title: '我的账户'
    }
  },
  {
    path: '/user/withdraw',
    component: _import('/user/user-withdraw'),
    meta: {
      title: '提现'
    }
  },
  {
    path: '/user/bills',
    component: _import('/user/user-bills/list'),
    meta: {
      title: '我的账单',
      goBackParam: {
        url: '/user/account',
        title: '我的账户'
      }
    }
  },
  {
    path: '/user/bills/:id/detail',
    component: _import('/user/user-bills/detail'),
    meta: {
      title: '账单详情',
      goBackParam: {
        url: '/user/bills',
        title: '我的账单'
      }
    }
  },
  {
    name: 'bankCard',
    path: '/user/bankCard',
    component: _import('/user/user-bankCard/list'),
    meta: {
      title: '我的银行卡',
      goBackParam: {
        url: '/user',
        title: '我的'
      }
    }
  },
  {
    name: 'addBankCard',
    path: '/user/bankCard/add',
    component: _import('/user/user-bankCard/addBankCard'),
    meta: {
      title: '添加银行卡',
      goBackParam: {
        url: '/user/bankCard',
        title: '银行卡列表'
      }
    }
  }
]
