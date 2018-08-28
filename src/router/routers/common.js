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
      title: '登录',
      notGetNews: true
    }
  },
  {
    path: '/addFriends',
    component: _import('/common/addFriends'),
    meta: {
      title: '添加服务者',
      notGetNews: true
    }
  },
  {
    path: '/shareServant/:id',
    component: _import('/common/shareServant'),
    meta: {
      title: '分享服务者',
      notGetNews: true
    }
  },
  {
    path: '/organ/item',
    component: _import('/common/organ/itemIndex'),
    meta: {
      title: '机构首页',
      notGetNews: true
    }
  },
  {
    path: '/organ/item/:id',
    component: _import('/common/organ/itemDetail'),
    meta: {
      title: '服务项详情',
      notGetNews: true
    }
  },
  {
    path: '/organ/servant',
    component: _import('/common/organ/servantIndex'),
    meta: {
      title: '机构首页',
      notGetNews: true
    }
  },
  {
    path: '/organ/servantList',
    component: _import('/common/organ/servantList'),
    meta: {
      title: '机构首页',
      notGetNews: true
    }
  },
  {
    path: '/recommend',
    component: _import('/common/recommend'),
    meta: {
      title: '推荐注册',
      notGetNews: true
    }
  }
]
