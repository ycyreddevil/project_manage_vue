import request from '@/utils/request'

export function getTaskList(params) {
  return request({
    url: '/task/getTaskList',
    method: 'post',
    params
  })
}
