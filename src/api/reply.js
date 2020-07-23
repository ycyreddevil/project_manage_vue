import request from '@/utils/request'

export default {
  list(query) {
    return request({
      url: '/comments/reply/list',
      method: 'get',
      params: query
    })
  }
}
