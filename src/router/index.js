import Vue from 'vue'
import Router from 'vue-router'
import { clearLoginInfo } from '@/utils'
import HelloWorld from '@/components/HelloWorld'
import notfound from '@/views/common/404'
import demo1 from '@/views/test/demo1'
import demo2 from '@/views/test/demo2'

Vue.use(Router)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/', component: HelloWorld, name: 'HelloWorld', meta: { title: '首页' } },
  { path: '/404', component: notfound, name: '404', meta: { title: '404未找到' } },
  { path: '/demo1', component: demo1, name: 'login', meta: { title: '测试' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: HelloWorld,
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/demo1', component: demo1, name: 'demo', meta: { title: '授权' } },
    { path: '/demo2', component: demo2, name: 'theme', meta: { title: '测试页面' } }
  ],
  beforeEnter (to, from, next) {
    let userId = Vue.cookie.get('userId')
    if (!userId || !/\S/.test(userId)) {
      clearLoginInfo()
      next({ name: 'demo1' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: globalRoutes.concat(mainRoutes)
})

export default router
