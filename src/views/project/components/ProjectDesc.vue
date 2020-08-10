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
              <project-dynamic-simple :project-id="projectId" v-on="$listeners" />
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <project-member-simple :project-id="projectId" v-on="$listeners" />
            </div>
          </el-col>
          <el-col :span="11" style="overflow-y: auto">
            <div class="chart-wrapper">
              <project-history-simple :project-id="projectId" />
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <detail-content :project-id="projectId" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ProjectHistorySimple from '@/views/project/components/ProjectHistorySimple'
import ProjectMemberSimple from '@/views/project/components/ProjectMemberSimple'
import ProjectDynamicSimple from '@/views/project/components/ProjectDynamicSimple'
import BarChart from '@/views/dashboard/admin/components/BarChart'
import DetailContent from '@/views/project/components/DetailContent'

export default {
  name: 'ProjectDesc',
  components: { ProjectHistorySimple, ProjectMemberSimple, ProjectDynamicSimple, BarChart, DetailContent },
  props: {
    projectId: {
      type: String,
      required: true
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
