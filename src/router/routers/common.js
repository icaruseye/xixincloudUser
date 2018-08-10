import _import from '../_import'

export default [
  {
    path: '*',
    component: _import('/common/pageNotFound')
  },
  {
    path: '/wxLogin',
    component: _import('/common/login')
  },
  {
    path: '/addFriends',
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
    path: '/organ',
    component: _import('/common/organ'),
    meta: {
      title: '机构首页'
    }
  },
  {
    path: '/organ/item/:id',
    component: _import('/common/organItem'),
    meta: {
      title: '服务项详情'
    }
  },
  {
    path: '/recommend',
    component: _import('/common/recommend'),
    meta: {
      title: '推荐注册'
    }
  }
]
