<template>
  <div class="detail_content">
    <el-form ref="form" class="chart-wrapper" :model="form" label-width="80px">
      <DetailHeader header-name="项目概述" :is-show-hidden="false" />
      <el-form-item label="项目名称" size="mini">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="项目编码" size="mini">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="项目类型" size="mini">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="负责人" size="mini">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="项目类型" size="mini">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="form.desc" type="textarea" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'ProjectDetailContent',
  components: {
    DetailHeader
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
