import request from '@/utils/request'

export default {
  list(query) {
    return request({
      url: '/comments/comment/list',
      method: 'get',
      params: query
    })
  }
}
