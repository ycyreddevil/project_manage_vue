<template>
  <div class="dashboard-editor-container">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="任务概述" name="desc"><task-desc /></el-tab-pane>
        <el-tab-pane label="任务动态" name="dynamic"><project-dynamic /></el-tab-pane>
        <el-tab-pane label="任务评论" name="comment"><project-comment /></el-tab-pane>
        <el-tab-pane label="任务预算" name="budget" />
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TaskDesc from '@/views/task/components/TaskDesc'
import ProjectDynamic from '@/views/project/components/ProjectDynamic'
import ProjectComment from '@/views/project/components/ProjectComment'
export default {
  name: 'ProjectDetail',
  components: { ProjectComment, ProjectDynamic, TaskDesc },
  data() {
    return {
      activeName: 'desc'
    }
  },
  watch: {
    activeName(val) {
    }
  },
  methods: {
    showCreatedTimes() {

    }
  }
}
</script>
<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 20px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .chart-wrapper {
      height: 28rem;
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
