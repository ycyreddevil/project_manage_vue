import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') { // 登录后login自动跳转
      next({ path: '/' })
      return
    }
    if (store.getters.modules.length > 0) {
      console.log(store.getters.modules)
      next()
      return
    }
    store.dispatch('user/getInfo').then(res => { // 拉取用户信息
      store.dispatch('user/getModulesTree').then(modules => { // 获取用户可访问的模块
        store.dispatch('permission/generateRoutes', { modules }).then(routes => { // 根据权限生成可访问的路由表
          router.addRoutes(routes) // 动态添加可访问路由表
          // next()
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      })
    }).catch((err) => {
      // store.dispatch('FedLogOut').then(() => {
      Message.error(err || '获取用户信息失败')
      next({ path: '/login' })
      // })
    })
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
