<template>
  <div class="block">
    <div class="filter-container">
      <el-link :type="dateType === 0 ? 'primary' : 'info'" style="padding: 10px 10px" @click="queryByDate(0)">所有</el-link>
      <el-link :type="dateType === 1 ? 'primary' : 'info'" style="padding: 10px 10px" @click="queryByDate(1)">昨天</el-link>
      <el-link :type="dateType === 2 ? 'primary' : 'info'" style="padding: 10px 10px" @click="queryByDate(2)">今天</el-link>
      <el-link :type="dateType === 3 ? 'primary' : 'info'" style="padding: 10px 10px" @click="queryByDate(3)">上月</el-link>
      <el-link :type="dateType === 4 ? 'primary' : 'info'" style="padding: 10px 10px" @click="queryByDate(4)">本月</el-link>
    </div>
    <el-timeline v-loading="loading">
      <el-timeline-item v-for="(time, index) in Object.keys(recordList)" :key="index" :timestamp="time" placement="top">
        <el-card shadow="hover">
          <div v-for="(record,index2) in recordList[time]" :key="index2">
            <span style="font-weight: bold" v-html="record.desc" />
            <p>{{ record.submitterName }} 提交于 {{ record.createTime }}
              <el-link type="primary" :href="'http://localhost:5555' + (JSON.parse(record.attachment)[0])">
                {{ JSON.parse(record.attachment)[0].substring(JSON.parse(record.attachment)[0].lastIndexOf('/')+1, JSON.parse(record.attachment)[0].length-1) }}
              </el-link>
            </p>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getTaskRecordByTaskId } from '@/api/task'
export default {
  name: 'TaskDynamic',
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recordList: [],
      startTime: '',
      endTime: '',
      dateType: 0,
      loading: false
    }
  },
  mounted() {
    getTaskRecordByTaskId({ projectOrTaskId: Number.parseInt(this.taskId), startTime: '', endTime: '' }).then(res => {
      if (res.code === 200) {
        this.recordList = res.result
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
    queryByDate(type) {
      this.loading = true
      this.dateType = type
      let startTime = ''
      let endTime = ''
      const now = new Date()
      if (type === 1) {
        startTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() - 1) + ' 00:00:00'
        endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate() - 1) + ' 23:59:59'
      } else if (type === 2) {
        startTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' 00:00:00'
        endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' 23:59:59'
      } else if (type === 3) {
        startTime = now.getFullYear() + '-' + now.getMonth() + '-1 00:00:00'
        endTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-1 00:00:00'
      } else if (type === 4) {
        startTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-1 00:00:00'
        endTime = now.getFullYear() + '-' + (now.getMonth() + 2) + '-1 00:00:00'
      }
      getTaskRecordByTaskId({ projectOrTaskId: Number.parseInt(this.taskId), startTime: startTime, endTime: endTime }).then(res => {
        if (res.code === 200) {
          this.recordList = res.result
          if (Object.keys(res.result).length === 0) {
            this.$message({
              message: '暂无数据',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
        this.loading = false
      }).catch(res => {
        this.$message({
          message: res,
          type: 'error'
        })
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
