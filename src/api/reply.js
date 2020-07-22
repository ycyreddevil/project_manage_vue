import service from '@/request/base'

export default {
  list(query) {
    return service({
      url: '/comments/reply/list',
      method: 'get',
      params: query
    })
  }
}
