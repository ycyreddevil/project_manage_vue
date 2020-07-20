<template>
  <div class="dashboard-editor-container">
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
              <project-dynamic />
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <project-member />
            </div>
          </el-col>
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <project-history />
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
import BarChart from '@/views/dashboard/admin/components/BarChart'
import ProjectDynamic from '@/views/project/components/ProjectDynamic'
import DetailContent from '@/views/project/components/DetailContent'
import ProjectMember from '@/views/project/components/ProjectMember'
import ProjectHistory from '@/views/project/components/ProjectHistory'
export default {
  name: 'ProjectDetail',
  components: { ProjectHistory, ProjectMember, ProjectDynamic, BarChart, DetailContent }
}
</script>
<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
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
