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

export function getTaskById(params) {
  return request({
    url: '/task/getTaskById',
    method: 'post',
    params
  })
}

export function getTaskRecordByTaskId(data) {
  return request({
    url: '/task/getTaskRecordByTaskId',
    method: 'post',
    data
  })
}

export function getTaskCommentById(params) {
  return request({
    url: '/task/getTaskCommentById',
    method: 'post',
    params
  })
}

export function addTaskComment(data) {
  return request({
    url: '/task/addTaskComment',
    method: 'post',
    data
  })
}

export function getLatestTaskRecordByTaskId(params) {
  return request({
    url: '/task/getLatestTaskRecordByTaskId',
    method: 'post',
    params
  })
}

export function addOrUpdateTask(data) {
  return request({
    url: '/task/addOrUpdateTask',
    method: 'post',
    data
  })
}

export function deleteTask(params) {
  return request({
    url: '/task/deleteTask',
    method: 'post',
    params
  })
}

export function addOrUpdateTaskRecord(data) {
  return request({
    url: '/task/addOrUpdateTaskRecord',
    method: 'post',
    data
  })
}

export function getSameLevelTask(params) {
  return request({
    url: '/task/getSameLevelTask',
    method: 'post',
    params
  })
}

export function updateTaskWeight(params) {
  return request({
    url: '/task/updateTaskWeight',
    method: 'post',
    params
  })
}
