import Mock from 'mockjs'
import moment from 'moment'
import RequestUtil from '@/utils/request'

const List = Mock.mock({
  'list|10': [{
    'id|+1': 1,
    target: 2,
    headimg: 'http://imgtu.5011.net/uploads/content/20170321/2172671490083881.jpg',
    author: '@cname',
    content: Mock.Random.cparagraph(2, 10),
    createTime: moment().valueOf(),
    updateTime: moment().valueOf()
  }]
}).list

export default {
  list: config => {
    const { target } = RequestUtil.param2Obj(config.url)

    const mockList = List.filter(item => {
      if (target && item.target !== parseInt(target)) return false
      return true
    })

    return {
      code: 0,
      message: 'success',
      result: mockList
    }
  }
}
