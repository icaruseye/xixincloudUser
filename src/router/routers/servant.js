import _import from '../_import'

export default [
  {
    path: '/',
    redirect: '/servant',
    meta: {
      title: '服务者'
    }
  },
  {
    path: '/servant',
    component: _import('/servant/servant'),
    meta: {
      title: '服务者'
    }
  },
  {
    path: '/systemMail',
    component: _import('/servant/MailList'),
    meta: {
      title: '系统消息'
    }
  },
  {
    path: '/servant/detail',
    component: _import('/servant/detail/index'),
    children: [{
      path: 'item/:id',
      component: _import('/servant/detail/item'),
      meta: {
        title: '服务项详情'
      }
    }, {
      path: 'package/:id',
      component: _import('/servant/detail/package'),
      meta: {
        title: '服务套餐详情'
      }
    }]
  },
  {
    path: '/servant/service/:id',
    component: _import('/servant/detail/service'),
    meta: {
      title: '服务者详情'
    }
  },
  {
    path: '/servant/chat/:id',
    component: _import('/servant/chat'),
    meta: {
      title: '聊天咨询'
    }
  },
  {
    path: '/servant/pay/:id',
    component: _import('/servant/pay'),
    meta: {
      title: '支付'
    }
  }
]
