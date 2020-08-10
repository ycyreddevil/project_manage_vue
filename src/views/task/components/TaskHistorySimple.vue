<template>
  <div>
    <detail-header header-name="历史记录" :is-show-hidden="false" />
    <ul>
      <li>{{ task.createTime }}, 由 {{ task.submitterName }} 创建。</li>
    </ul>
  </div>
</template>
<script>
import { getTaskById } from '@/api/project'
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'TaskHistorySimple',
  components: { DetailHeader },
  props: {
    taskId: {
      type: String
    }
  },
  data() {
    return {
      task: {}
    }
  },
  mounted() {
    getTaskById({ taskId: this.taskId }).then(res => {
      if (res.code === 200) {
        this.task = res.result
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    }).catch(res => {
      this.$message({
        message: res.message,
        type: 'error'
      })
    })
  }
}
</script>
<style lang="scss" scoped>
  li{
    margin: 5px 0px
  }
</style>
