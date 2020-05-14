// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import httpRequest from './utils/httpRequest'
import cloneDeep from 'lodash/cloneDeep'
import VueMeta from 'vue-meta'
import VueJsonp from 'vue-jsonp'

Vue.use(VueJsonp)
Vue.config.productionTip = false
Vue.use(VueCookie)
Vue.use(VueMeta)

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  components: { App },
  template: '<App/>'
})
