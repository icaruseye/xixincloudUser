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
    component: _import('/servant/MailTypeList'),
    meta: {
      title: '我的消息'
    }
  },
  {
    path: '/systemMail/:type/list',
    component: _import('/servant/MailList'),
    meta: {
      title: '站内信列表'
    }
  },
  {
    path: '/mail/:id/detail',
    component: _import('/servant/MailDetail'),
    meta: {
      title: '站内信详情'
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
      title: '售前咨询'
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
