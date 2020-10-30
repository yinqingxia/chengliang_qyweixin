/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {}

  // api接口请求地址
 // window.SITE_CONFIG['baseUrl'] = 'http://192.168.1.170:8080'
 // window.SITE_CONFIG['baseUrl'] = 'http://iot.bplead.com:8085' //部署服务器改这里
  //window.SITE_CONFIG['baseUrl'] = 'http://192.168.1.118:8080/proxyApi'
  window.SITE_CONFIG['baseUrl'] = 'http://iot.bplead.com:8080/proxyApi'
  window.SITE_CONFIG['appKey']='03ff3fa4-f22a-448e-8bbc-acd13d5e8b26'
  window.SITE_CONFIG['APPID']='ww638e7382aac898d5'
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['version'] = '' // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version





})()
