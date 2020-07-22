import service from '@/request/base'

export default {
  list(query) {
    return service({
      url: '/comments/comment/list',
      method: 'get',
      params: query
    })
  }
}
