<template>
  <div class="detail_content">
    <el-form ref="form" class="chart-wrapper" :model="form" label-width="80px">
      <DetailHeader header-name="任务概述" :is-show-hidden="false" />
      <el-form-item label="任务名称" size="mini">
        {{ form.name }}
      </el-form-item>
      <el-form-item label="任务描述" size="mini">
        {{ form.region }}
      </el-form-item>
      <el-form-item label="任务类型" size="mini">
        {{ form.date1 }}
      </el-form-item>
      <el-form-item label="负责人" size="mini">
        {{ form.date2 }}
      </el-form-item>
      <el-form-item label="验收标准" size="mini">
        {{ form.delivery }}
      </el-form-item>
      <el-form-item label="任务权重">
        {{ form.type }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查看详情</el-button>
        <el-button>查看下一项</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'TaskDetailContent',
  components: {
    DetailHeader
  },
  data() {
    return {
      form: {
        name: '绩效考核与产值',
        region: '任务可分门别类（研发、专利、项目申报、调研等），按照不同类别，可进行产值或绩效的统计',
        date1: '研发',
        date2: '余尧毅',
        delivery: '任务可分门别类（研发、专利、项目申报、调研等），按照不同类别，可进行产值或绩效的统计任务可分门别类（研发、专利、项目申报、调研等），按照不同类别，可进行产值或绩效的统计',
        type: '20%'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    showMoreDynamic() {
      console.log('222')
    }
  }
}
</script>
<style lang="scss" scoped>
  .detail_content {
    background-color: rgb(240, 242, 245);
    position: relative;
    .chart-wrapper {
      height: 58.5rem;
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
