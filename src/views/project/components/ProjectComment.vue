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
import { getProjectCommentById, addProjectComment } from '@/api/project'

export default {
  name: 'ProjectComment',
  components: { Comment },
  props: {
    projectId: {
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
      getProjectCommentById({ projectId: this.projectId }).then(res => {
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
      addProjectComment({ content: content, projectId: Number.parseInt(this.projectId) }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    doChildSend(content, targetUserId, parentId) {
      addProjectComment({ content: content, projectId: Number.parseInt(this.projectId), parentId: parentId, targetUserId: targetUserId }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '评论成功',
            type: 'success'
          })
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
