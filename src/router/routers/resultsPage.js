import _import from '../_import'

export default [
  {
    path: '/result/complaint',
    component: _import('/resultsPage/complaint'),
    meta: {
      title: '投诉结果'
    }
  },
  {
    path: '/result/paySuccess',
    component: _import('/resultsPage/paySuccess'),
    meta: {
      title: '支付成功'
    }
  },
  {
    path: '/result/payCancel',
    component: _import('/resultsPage/cancel'),
    meta: {
      title: '取消成功'
    }
  }
]
