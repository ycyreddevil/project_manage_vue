<template>
  <div class="dashboard-editor-container">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="项目概述" name="desc"><project-desc /></el-tab-pane>
        <el-tab-pane label="团队管理" name="team" />
        <el-tab-pane label="项目任务" name="task" />
        <el-tab-pane label="项目动态" name="dynamic" />‘
        <el-tab-pane label="预算管理" name="budget" />
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ProjectDesc from '@/views/project/components/ProjectDesc'
export default {
  name: 'ProjectDetail',
  components: { ProjectDesc },
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
