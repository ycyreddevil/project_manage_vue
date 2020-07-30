<template>
  <div class="dashboard-editor-container">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="项目概述" name="desc"><project-desc :project-id="projectId" @changeTab="changeTab" /></el-tab-pane>
        <el-tab-pane label="团队管理" name="team"><project-member /></el-tab-pane>
        <el-tab-pane label="项目任务" name="task"><project-task :project-id="projectId" /></el-tab-pane>
        <el-tab-pane label="项目动态" name="dynamic"><project-dynamic /></el-tab-pane>
        <el-tab-pane label="项目评论" name="comment"><project-comment /></el-tab-pane>
        <el-tab-pane label="预算管理" name="budget" />
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ProjectDesc from '@/views/project/components/ProjectDesc'
import ProjectMember from '@/views/project/components/ProjectMember'
import ProjectTask from '@/views/project/components/ProjectTask'
import ProjectDynamic from '@/views/project/components/ProjectDynamic'
import ProjectComment from '@/views/project/components/ProjectComment'
export default {
  name: 'ProjectDetail',
  components: { ProjectComment, ProjectDynamic, ProjectTask, ProjectMember, ProjectDesc },
  data() {
    return {
      activeName: 'desc',
      projectId: ''
    }
  },
  watch: {
    activeName(val) {
    }
  },
  created() {
    this.projectId = this.$route.params.id
  },
  methods: {
    changeTab(name) {
      this.activeName = name
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
