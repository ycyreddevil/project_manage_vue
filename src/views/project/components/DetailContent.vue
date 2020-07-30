<template>
  <div class="detail_content">
    <el-form ref="form" class="chart-wrapper" :model="form" label-width="100px">
      <DetailHeader header-name="项目概述" :is-show-hidden="false" />
      <el-form-item label="项目名称" size="mini">
        {{ form.name }}
      </el-form-item>
      <el-form-item label="项目编码" size="mini">
        {{ form.code }}
      </el-form-item>
      <el-form-item label="项目类型" size="mini">
        {{ form.type }}
      </el-form-item>
      <el-form-item label="负责人" size="mini">
        {{ form.chargeUserName }}
      </el-form-item>
      <el-form-item label="项目开始时间" size="mini">
        {{ form.startTime }}
      </el-form-item>
      <el-form-item label="项目结束时间" size="mini">
        {{ form.endTime }}
      </el-form-item>
      <el-form-item label="项目描述">
        {{ form.desc }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editProject">编辑</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getProjectById } from '@/api/project'
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'ProjectDetailContent',
  components: {
    DetailHeader
  },
  props: {
    projectId: {
      type: String,
      required: true
    }
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
  mounted() {
    getProjectById({ id: this.projectId }).then(res => {
      if (res.code === 200) {
        this.form = res.result
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    }).catch(res => {
      this.$message({
        message: res,
        type: 'error'
      })
    })
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    showMoreDynamic() {
      console.log('222')
    },
    editProject() {
      this.$router.push('/project/addorupdate/4')
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
