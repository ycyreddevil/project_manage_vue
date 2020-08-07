import request from '@/utils/request'

export function getTaskList(data) {
  return request({
    url: '/task/getTaskList',
    method: 'post',
    data
  })
}
export function beginTask(params) {
  return request({
    url: '/task/beginTask',
    method: 'post',
    params
  })
}
export function endTask(params) {
  return request({
    url: '/task/endTask',
    method: 'post',
    params
  })
}

export function cancelTask(params) {
  return request({
    url: '/task/cancelTask',
    method: 'post',
    params
  })
}

export function getChilrenTaskTree(params) {
  return request({
    url: '/task/getChilrenTaskTree',
    method: 'post',
    params
  })
}

