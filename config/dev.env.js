'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_PATH: '"http://192.168.2.101/api/User"',
  // API_PATH: '"http://192.168.2.236:8989/api/User"',
  API_PATH: '"http://192.168.2.100/api/User"',
  IMG_PATH: '"http://www.xixincloud.com:6883"'
})
