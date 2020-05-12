// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import httpRequest from './utils/httpRequest'

Vue.config.productionTip = false
Vue.use(VueCookie)

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
