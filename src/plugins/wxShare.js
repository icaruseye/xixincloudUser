import Vue from 'vue'
import { WechatPlugin } from 'vux'
import http from '@/api'

Vue.use(WechatPlugin)

export default function wxShare ({title, desc, timelineTitle, link, logo} = {}) {
  let url = window.encodeURIComponent(location.href.split('#')[0])
  http.get(`/WechatConfig?url=${url}`).then(result => {
    if (result.status !== 200) {
      return false
    }
    Vue.wechat.config({
      debug: false,
      appId: result.data.Data.appId,
      timestamp: result.data.Data.timestamp,
      nonceStr: result.data.Data.noncestr,
      signature: result.data.Data.signature,
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    })
    link = `${window.location.protocol}//${window.location.host}${link}`
    Vue.wechat.ready(() => {
      Vue.wechat.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc || '默认分享文案', // 分享描述
        link: link || window.location.href, // 分享链接
        imgUrl: logo || '图标地址（必须是有效的Link）' // 分享图标
      })
      Vue.wechat.onMenuShareTimeline({
        title: timelineTitle || desc || '内容分享', // 分享标题，由于分享到朋友圈没有desc，所以这里采用的策略是，指定的朋友圈分享标题优先，其次采用发送给朋友的描述，最后采用默认文案。
        link: link || window.location.href, // 分享链接
        imgUrl: logo || '图标地址（必须是有效的Link）' // 分享图标
      })
    })
  })
}

// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
Vue.prototype.$wxShare = wxShare
