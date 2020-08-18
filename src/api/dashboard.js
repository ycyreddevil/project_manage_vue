import request from '@/utils/request'

export function getDashboardPendingNum() {
  return request({
    url: '/dashboard/getDashboardPendingNum',
    method: 'post'
  })
}

export function getProjectAnalyse() {
  return request({
    url: '/dashboard/getProjectAnalyse',
    method: 'post'
  })
}

export function addOrUpdateSchedule(data) {
  return request({
    url: '/dashboard/addOrUpdateSchedule',
    method: 'post',
    data
  })
}

export function getSchedule() {
  return request({
    url: '/dashboard/getSchedule',
    method: 'post'
  })
}

export function deleteSchedule(params) {
  return request({
    url: '/dashboard/deleteSchedule',
    method: 'post',
    params
  })
}
