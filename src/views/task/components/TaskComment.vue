<template>
  <div>
    <el-main v-loading="loading">
      <Comment
        :comment-list="comments"
        :comment-num="comments.length"
        :min-rows="2"
        :max-rows="4"
        comment-width="80%"
        :avatar="this.$store.getters.avatar"
        :author-id="this.$store.getters.authorId"
        @doSend="doSend"
        @doChidSend="doChildSend"
      />
    </el-main>
  </div>

</template>
<script>
import Comment from 'hbl-comment'
import { getTaskCommentById, addTaskComment } from '@/api/task'

export default {
  name: 'TaskComment',
  components: { Comment },
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      loading: false
    }
  },
  mounted: function() {
    this.listComments()
  },
  methods: {
    listComments() {
      this.loading = true
      getTaskCommentById({ taskId: this.taskId }).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.comments = res.result
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      }).catch(res => {
        this.loading = false
        this.$message({
          message: res,
          type: 'error'
        })
      })
    },
    doSend(content) {
      addTaskComment({ content: content, taskId: Number.parseInt(this.taskId) }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
          // 把新增的评论加到列表中 用于回显
          this.comments.push(res.result)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    doChildSend(content, targetUserId, parentId) {
      addTaskComment({ content: content, taskId: Number.parseInt(this.taskId), parentId: parentId, targetUserId: targetUserId }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
          // 把新增的评论加到列表中 用于回显
          this.comments.find(u => u.id === parentId)['childrenList'].push(res.result)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
