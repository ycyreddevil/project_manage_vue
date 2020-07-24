<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="16">
        <el-row type="flex" justify="space-around">
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <bar-chart />
            </div>
          </el-col>
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <project-dynamic-simple />
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <task-budget-simple />
            </div>
          </el-col>
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <project-history-simple />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <detail-content />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ProjectHistorySimple from '@/views/project/components/ProjectHistorySimple'
import ProjectDynamicSimple from '@/views/project/components/ProjectDynamicSimple'
import BarChart from '@/views/dashboard/admin/components/BarChart'
import DetailContent from '@/views/task/components/DetailContent'
import TaskBudgetSimple from '@/views/task/components/TaskBudgetSimple'

export default {
  name: 'TaskDesc',
  components: { TaskBudgetSimple, ProjectHistorySimple, ProjectDynamicSimple, BarChart, DetailContent }
}
</script>
<style lang="scss" scoped>
  .chart-wrapper {
    height: 28rem;
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
