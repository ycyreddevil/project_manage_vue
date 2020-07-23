import Mock from 'mockjs'
import moment from 'moment'
import RequestUtil from '@/utils/request'

const List = Mock.mock({
  'list|10': [{
    'id|+1': 1,
    'cid|1-10': 10,
    headimg: 'http://imgtu.5011.net/uploads/content/20170321/2172671490083881.jpg',
    author: '@cname',
    content: Mock.Random.cparagraph(2, 10),
    createTime: moment().valueOf(),
    updateTime: moment().valueOf()
  }]
}).list

// export default {
//   list: config => {
//     const { cid } = RequestUtil.param2Obj(config.url)
//
//     const mockList = List.filter(item => {
//       if (cid && item.cid !== parseInt(cid)) return false
//       return true
//     })
//
//     return {
//       code: 0,
//       message: 'success',
//       result: mockList
//     }
//   }
// }

module.exports = [
  {
    url: '/comments/reply/list',
    type: 'get',
    response: config => {
      // const { importance, type, title, page = 1, limit = 20, sort } = config.query
      //
      // let mockList = List.filter(item => {
      //   if (importance && item.importance !== +importance) return false
      //   if (type && item.type !== type) return false
      //   if (title && item.title.indexOf(title) < 0) return false
      //   return true
      // })
      //
      // if (sort === '-id') {
      //   mockList = mockList.reverse()
      // }
      //
      // const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 0,
        message: 'success',
        result: List
      }
    }
  }
]
