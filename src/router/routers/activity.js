import _import from '../_import'

export default [
  {
    path: '/activity/share',
    component: _import('/activity/share'),
    meta: {
      title: '分享套餐',
      share: true
    }
  },
  {
    path: '/activity/detail/:id',
    component: _import('/activity/detail'),
    meta: {
      title: '活动详情'
    }
  }
]
