<template>
  <div>
    <detail-header header-name="历史记录" :is-show-hidden="false" />
    <ul>
      <li>{{ project.createTime }}, 由 {{ project.submitterName }} 创建。</li>
    </ul>
  </div>
</template>
<script>
import { getProjectById } from '@/api/project'
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'ProjectHistorySimple',
  components: { DetailHeader },
  props: {
    projectId: {
      type: String
    }
  },
  data() {
    return {
      project: {}
    }
  },
  mounted() {
    getProjectById({ id: this.projectId }).then(res => {
      if (res.code === 200) {
        this.project = res.result
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
