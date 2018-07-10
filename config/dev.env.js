'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PATH: '"http://192.168.2.100/api/User"',
  DEV_PROXY_API: '"http://192.168.2.100"',
  IMG_PATH: '"http://xixincloud.com:6883"',
  wechatOption: {
    appId: '"wx2546ec2fa6edb45a"',
    appsecret: '"appsecret"',
    redirectUrl: '"http://cjt.n.liswn.com/User/Login?shopID=682"'
  }
})
