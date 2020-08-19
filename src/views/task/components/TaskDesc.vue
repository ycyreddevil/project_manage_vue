<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="16">
        <el-row type="flex" justify="space-around">
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <task-burn-out-chart :task-id="taskId" />
            </div>
          </el-col>
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <task-dynamic-simple :task-id="taskId" v-on="$listeners" />
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
              <task-history-simple :task-id="taskId" />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <detail-content :task-id="taskId" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import TaskDynamicSimple from '@/views/task/components/TaskDynamicSimple'
import DetailContent from '@/views/task/components/DetailContent'
import TaskBudgetSimple from '@/views/task/components/TaskBudgetSimple'
import TaskHistorySimple from '@/views/task/components/TaskHistorySimple'
import TaskBurnOutChart from '@/views/task/components/TaskBurnOutChart'

export default {
  name: 'TaskDesc',
  components: { TaskHistorySimple, TaskBudgetSimple, TaskBurnOutChart, DetailContent, TaskDynamicSimple },
  props: {
    taskId: {
      type: String
    }
  }
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
