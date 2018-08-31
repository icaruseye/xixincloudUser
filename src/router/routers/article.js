import _import from '../_import'

export default [
  {
    path: '/article/list',
    component: _import('/article/list'),
    meta: {
      title: '文章列表'
    }
  },
  {
    path: '/article/detail/:id',
    component: _import('/article/detail'),
    meta: {
      title: '文章详情'
    }
  }
]
