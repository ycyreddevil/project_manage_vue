<template>
  <div>
    <el-main>
      <Comment />
      <!--      <comments-item-->
      <!--        v-for="comment in comments"-->
      <!--        :key="comment.id"-->
      <!--        :avatar="comment.headimg"-->
      <!--        :author="comment.author"-->
      <!--        :content="comment.content"-->
      <!--        :time="comment.createTime"-->
      <!--        :has-reply="replys[comment.id] && replys[comment.id].length > 0"-->
      <!--        @clickAvatar="handleClickAvatar(comment)"-->
      <!--        @clickAuthor="handleClickAuthor(comment)"-->
      <!--        @addReply="handleAddReply(comment)"-->
      <!--      >-->
      <!--        <reply-item v-for="reply in replys[comment.id]" :key="reply.id" :author="reply.author" :content="reply.content" :time="reply.createTime" />-->
      <!--      </comments-item>-->
    </el-main>
  </div>

</template>
<script>
import Comment from 'hbl-comment'
import Mock from 'mockjs'
import moment from 'moment'
export default {
  name: 'ProjectComment',
  components: { Comment },
  data() {
    return {
      comments: [],
      replys: {}
    }
  },
  watch: {
  },
  created: function() {
    this.listComments()
  },
  methods: {
    listComments() {
      // const self = this
      // CommentService.list({
      //   target: 2
      // }).then(data => {
      //   data = data.result
      //   self.comments = data ? [].concat(data) : []
      //   if (self.comments.length > 0) {
      //     self.listReply()
      //   }
      // })
      this.comments = [{
        id: 1,
        target: 2,
        headimg: 'http://imgtu.5011.net/uploads/content/20170321/2172671490083881.jpg',
        author: '@cname',
        content: Mock.Random.cparagraph(2, 10),
        createTime: moment().valueOf(),
        updateTime: moment().valueOf()
      }]
    },
    listReply() {
      const self = this
      self.replys = {}
      if (self.comments.length < 0) {
        return
      }
      self.replys = [{
        id: 1,
        cid: 10,
        headimg: 'http://imgtu.5011.net/uploads/content/20170321/2172671490083881.jpg',
        author: '@cname',
        content: Mock.Random.cparagraph(2, 10),
        createTime: moment().valueOf(),
        updateTime: moment().valueOf()
      }]
      // for (let i = 0; i < self.comments.length; i++) {
      //   const value = self.comments[i]
      //   ReplyService.list({
      //     cid: value.id
      //   }).then(data => {
      //     data = data.result
      //     self.$set(self.replys, value.id, data ? [].concat(data) : [])
      //   })
      // }
    },
    handleClickAvatar(item) {
      console.log('点击了头像')
    },
    handleClickAuthor(item) {
      console.log('点击了用户')
    },
    handleAddReply(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
