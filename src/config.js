/* * 项目配置文件 */
module.exports = {
  'DEV_HOST': '192.168.2.236',
  // 开发环境的地址/可填ip
  'DEV_API_PORT': 8080,
  // 开启代理转发接口（填API地址）
  // 'DEV_PROXY_API': 'http://api.xixincloud.com',
  'DEV_PROXY_API': 'http://192.168.2.100',
  // 微信APPID
  '_WXAPPID_': '',
  // API请求延迟时间
  '_TIMEOUT_': 15000,
  // 发布后可以为空
  // '_PATH_': 'http://api.xixincloud.com/api/User',
  '_PATH_': '/api/User',
  // 发布路径
  'BUILD_PATH': '',
  // 图片CDN地址
  '_IMG_CDN_PATH': 'http://xixincloud.com:6883/File/'
}
