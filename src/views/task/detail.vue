<template>
  <div class="dashboard-editor-container">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="任务概述" name="desc"><task-desc :task-id="taskId" @changeTab="changeTab" /></el-tab-pane>
        <el-tab-pane label="任务动态" name="dynamic"><task-dynamic :task-id="taskId" /></el-tab-pane>
        <el-tab-pane label="任务评论" name="comment"><task-comment :task-id="taskId" /></el-tab-pane>
        <el-tab-pane label="任务预算" name="budget"><task-budget /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TaskDesc from '@/views/task/components/TaskDesc'
import TaskDynamic from '@/views/task/components/TaskDynamic'
import TaskComment from '@/views/task/components/TaskComment'
import TaskBudget from '@/views/task/components/TaskBudget'
export default {
  name: 'TaskDetail',
  components: { TaskBudget, TaskComment, TaskDynamic, TaskDesc },
  data() {
    return {
      activeName: 'desc',
      taskId: ''
    }
  },
  watch: {
    activeName(val) {
    }
  },
  created() {
    this.taskId = this.$route.params.id
  },
  methods: {
    showCreatedTimes() {

    },
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
