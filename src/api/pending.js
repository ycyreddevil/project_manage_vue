import request from '@/utils/request'

export function getToBeApprovedList(data) {
  return request({
    url: '/pending/getToBeApprovedList',
    method: 'post',
    data
  })
}

export function getHaveApprovedList(data) {
  return request({
    url: '/pending/getHaveApprovedList',
    method: 'post',
    data
  })
}

export function getMySubmitList(data) {
  return request({
    url: '/pending/getMySubmitList',
    method: 'post',
    data
  })
}

export function agree(params) {
  return request({
    url: '/pending/agree',
    method: 'post',
    params
  })
}

export function disagree(params) {
  return request({
    url: '/pending/disagree',
    method: 'post',
    params
  })
}
