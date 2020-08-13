<template>
  <div class="dashboard-editor-container">
    <Warning text="请对以下任务进行权重分配，所有任务权重之和必须等于100。" />
    <div class="chart-wrapper">
      <el-form ref="form" label-width="80px">
        <el-form-item v-for="(task,index) in sameLevelTask" :key="index" :label="task.taskDesc">
          <el-input-number v-model="task.weight" :min="1" :max="100" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="reset">还原</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSameLevelTask, updateTaskWeight } from '@/api/task'
import Warning from '@/views/project/components/ProjectAddOrUpdateWarning'

export default {
  name: 'Distribute',
  components: {
    Warning
  },
  data() {
    return {
      taskId: 0,
      sameLevelTask: []
    }
  },
  mounted() {
    this.taskId = this.$route.params.id
    getSameLevelTask({ taskId: this.taskId }).then(res => {
      if (res.code === 200) {
        this.sameLevelTask = res.result
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
      this.$confirm(`是否提交已做出的分配?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const total = this.sameLevelTask.map(item => { return item.weight }).reduce((total, num) => total + num)
        if (total !== 100) {
          this.$alert('任务权重总和不等于100，请重新分配', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
          return
        }
        updateTaskWeight({ list: JSON.stringify(this.sameLevelTask) }).then(res => {
          if (res.code === 200) {
            this.$alert('任务权重分配成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.replace('/task/index')
              }
            })
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    reset() {
      this.$confirm(`是否还原已做出的分配?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getSameLevelTask({ taskId: this.taskId }).then(res => {
          if (res.code === 200) {
            this.sameLevelTask = res.result
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    position: relative;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin: auto;
      width: 30%
    }
  }
</style>
