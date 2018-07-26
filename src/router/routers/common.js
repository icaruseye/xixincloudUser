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
      title: '添加服务者'
    }
  },
  {
    path: '/organ/:id',
    component: _import('/common/organ'),
    meta: {
      title: '机构首页'
    }
  }
]
