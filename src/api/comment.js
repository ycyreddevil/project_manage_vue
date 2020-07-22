import request from '@/utils/request'

export default {
  list(query) {
    return request({
      baseURL: 'http://localhost:9527',
      url: '/comments/comment/list',
      method: 'get',
      params: query
    })
  }
}
