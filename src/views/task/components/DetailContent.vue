<template>
  <div class="detail_content">
    <el-form ref="task" class="chart-wrapper" :model="task" label-width="80px">
      <DetailHeader header-name="任务概述" :is-show-hidden="false" />
      <el-form-item label="任务名称" size="mini">
        {{ task.taskName }}
      </el-form-item>
      <el-form-item label="任务描述" size="mini">
        {{ task.taskDesc }}
      </el-form-item>
      <el-form-item label="任务类型" size="mini">
        {{ task.taskType }}
      </el-form-item>
      <el-form-item label="负责人" size="mini">
        {{ task.chargeUserName }}
      </el-form-item>
      <el-form-item label="验收标准" size="mini">
        {{ task.acceptanceCriteria }}
      </el-form-item>
      <el-form-item label="任务权重">
        {{ task.weight }}
      </el-form-item>
      <el-form-item label="需求描述">
        {{ task.requireDesc }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editTask">查看详情</el-button>
        <el-button>查看下一项</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import DetailHeader from '@/views/project/components/DetailHeader'
import { getTaskById } from '@/api/task'
export default {
  name: 'TaskDetailContent',
  components: {
    DetailHeader
  },
  props: {
    taskId: {
      type: String
    }
  },
  data() {
    return {
      task: {}
    }
  },
  mounted() {
    getTaskById({ taskId: this.taskId }).then(res => {
      if (res.code === 200) {
        this.task = res.result
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
    editTask() {
      this.$router.push('/task/addorupdate/' + this.taskId)
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
