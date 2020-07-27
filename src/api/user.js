import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/login/login',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/login/getInfo',
    method: 'get',
    params: { token }
  })
}

export function getModulesTree(token) {
  return request({
    url: '/login/getModulesTree',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function checkToken(data) {
  return request({
    url: '/login/checkToken',
    method: 'post',
    data
  })
}

export function findUsers(params) {
  return request({
    url: '/user/findUsers',
    method: 'post',
    params
  })
}
