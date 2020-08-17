import request from '@/utils/request'

export function getToBeReplied(data) {
  return request({
    url: '/message/getToBeReplied',
    method: 'post',
    data
  })
}

export function getHaveReplied(data) {
  return request({
    url: '/message/getHaveRelied',
    method: 'post',
    data
  })
}

export function quickComment(parmas) {
  return request({
    url: '/message/quickComment',
    method: 'post',
    parmas
  })
}
