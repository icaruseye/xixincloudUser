import _import from '../_import'

export default [
  {
    path: '*',
    component: _import('/common/pageNotFound')
  },
  {
    path: '/wxLogin',
    component: _import('/common/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/addFriends',
    component: _import('/common/addFriends'),
    meta: {
      title: '添加服务者'
    }
  },
  {
    path: '/addFriends/:id',
    component: _import('/common/addFriends'),
    meta: {
      title: '添加服务者'
    }
  },
  {
    path: '/shareServant/:id',
    component: _import('/common/shareServant'),
    meta: {
      title: '分享服务者'
    }
  },
  {
    path: '/organ/item',
    component: _import('/common/organ/itemIndex'),
    meta: {
      title: '机构首页'
    }
  },
  {
    path: '/organ/item/:id',
    component: _import('/common/organ/itemDetail'),
    meta: {
      title: '服务项详情'
    }
  },
  {
    path: '/organ/servant',
    component: _import('/common/organ/servantIndex'),
    meta: {
      title: '机构首页'
    }
  },
  {
    path: '/organ/servantList',
    component: _import('/common/organ/servantList'),
    meta: {
      title: '机构首页'
    }
  },
  {
    path: '/recommend',
    component: _import('/common/recommend'),
    meta: {
      share: true,
      noneedLogin: true
    }
  },
  {
    path: '/organ/registration',
    component: _import('/registration'),
    meta: {
      title: '预约挂号'
    }
  },
  {
    path: '/organ/registration/servant/:id',
    component: _import('/registration/servant'),
    meta: {
      title: '预约挂号'
    }
  },
  {
    path: '/organ/registration/order/:id',
    component: _import('/registration/order'),
    meta: {
      title: '预约挂号'
    }
  },
  {
    path: '/organ/registration/pay',
    component: _import('/registration/pay'),
    meta: {
      title: '支付'
    }
  }
]
