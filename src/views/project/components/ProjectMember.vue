<template>
  <div>
    <detail-header header-name="项目团队" :show-more-function="showTeamManage" />
    <el-row class="ycy" type="flex" style="margin-bottom:1.5rem" justify="space-between">
      <el-col :span="6">
        <svg-icon icon-class="people" />
        <span>余尧毅(项目经理)</span>
      </el-col>
      <el-col :span="8">
        <svg-icon icon-class="people" />
        <span>余昌运(产品经理)</span>
      </el-col>
    </el-row>
    <el-row class="ycy" type="flex" style="margin-bottom:1.5rem" justify="space-between">
      <el-col :span="6">
        <svg-icon icon-class="people" />
        <span>余尧毅(项目经理)</span>
      </el-col>
      <el-col :span="8">
        <svg-icon icon-class="people" />
        <span>余昌运(产品经理)</span>
      </el-col>
    </el-row>
    <el-row class="ycy" type="flex" style="margin-bottom:1.5rem" justify="space-between">
      <el-col :span="6">
        <svg-icon icon-class="people" />
        <span>余尧毅(项目经理)</span>
      </el-col>
      <el-col :span="8">
        <svg-icon icon-class="people" />
        <span>余昌运(产品经理)</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'ProjectMember',
  components: { DetailHeader },
  data() {
    return {
    }
  },
  methods: {
    showTeamManage() {
      console.log(111)
    }
  }
}
</script>
<style lang="scss" scoped>
  .ycy{
    span{
      margin-left: 5px;
      color: gray;
    }
  }
</style>
