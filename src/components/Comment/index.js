import CommentsItem from 'comments-item/index.js'
import ReplyItem from 'reply-item/index.js'

const components = [
  CommentsItem,
  ReplyItem
]

const install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.1',
  name: 'BhComments',
  install,
  CommentsItem,
  ReplyItem
}
