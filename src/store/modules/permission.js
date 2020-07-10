import { constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const groupRoutes = (data) => {
  const parentPath = data.item.url
  const newPath = {
    path: parentPath || '/',
    component: data.children && data.children.length > 0 ? Layout : () => import('@/views' + data.item.url.toLowerCase()),
    meta: {
      title: data.item.name,
      sortNo: data.item.sortNo,
      icon: data.item.iconName
    },
    name: data.item.name,
    hidden: false,
    children: []
  }
  if (data.children && data.children.length > 0) {
    data.children.forEach(child => {
      newPath.children.push(groupRoutes(child))
    })
  }
  return newPath
}

const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      (async() => {
        const accessedRoutes = []
        await data.modules.forEach((value, index) => {
          accessedRoutes.push(groupRoutes(value))
        })
        // if (roles.includes('admin')) {
        //   accessedRoutes = asyncRoutes || []
        // } else {
        //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
