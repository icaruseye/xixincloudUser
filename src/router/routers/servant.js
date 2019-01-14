import _import from '../_import'

export default [
  {
    path: '/',
    redirect: '/servant',
    meta: {
      title: '服务者',
      isNeedGetNews: true
    }
  },
  {
    path: '/servant',
    component: _import('/servant/servant'),
    meta: {
      title: '服务者',
      isNeedGetNews: true
    }
  },
  {
    path: '/systemMail',
    component: _import('/servant/MailTypeList'),
    meta: {
      title: '我的消息',
      isNeedGetNews: true
    }
  },
  {
    path: '/systemMail/:type/list',
    component: _import('/servant/MailList'),
    meta: {
      title: '站内信列表',
      isNeedGetNews: true
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
    redirect: '/servant/:id'
  },
  {
    path: '/servant/:id',
    component: _import('/servant/index'),
    meta: {
      title: '服务者详情',
      ModuleSwitch: true
    }
  },
  {
    path: '/servant/course/:id',
    component: _import('/servant/course/detail'),
    meta: {
      title: '课程详情'
    }
  },
  {
    path: '/servant/course/topic/:id',
    component: _import('/servant/course/topic'),
    meta: {
      title: '练习'
    }
  },
  {
    path: '/servant/course/courseware/:courseID/:id',
    component: _import('/servant/course/coursewareDetail'),
    meta: {
      title: '课件'
    }
  },
  {
    path: '/servant/chat/:id',
    component: _import('/servant/chat'),
    meta: {
      title: '售前咨询',
      isNeedGetNews: true
    }
  },
  {
    path: '/servant/pay/:id',
    component: _import('/servant/pay'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/servant/registration/:id',
    component: _import('/servant/registration'),
    meta: {
      title: '在线挂号'
    }
  }
]
