<template>
  <div class="block">
    <div class="filter-container">
      <el-link type="info" style="padding: 10px 10px">所有</el-link>
      <el-link type="info" style="padding: 10px 10px">昨天</el-link>
      <el-link type="info" style="padding: 10px 10px">今天</el-link>
      <el-link type="info" style="padding: 10px 10px">上周</el-link>
      <el-link type="info" style="padding: 10px 10px">本周</el-link>
      <el-link type="info" style="padding: 10px 10px">上周</el-link>
      <el-link type="info" style="padding: 10px 10px">本月</el-link>
    </div>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'ProjectDynamic',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
