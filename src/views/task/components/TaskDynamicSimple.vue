<template>
  <div class="block">
    <DetailHeader header-name="最新动态" :show-more-function="showMoreDynamic" />
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(record, index) in recordList"
        :key="index"
        :timestamp="record.createTime"
      >
        {{ record.desc }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import { getLatestTaskRecordByTaskId } from '@/api/task'
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'TaskDynamicSimple',
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
      reverse: false,
      recordList: []
    }
  },
  mounted() {
    getLatestTaskRecordByTaskId({ taskId: this.taskId }).then(res => {
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
    showMoreDynamic() {
      this.$emit('changeTab', 'dynamic')
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .el-timeline-item__timestamp.is-bottom {
    position: absolute;
    left: -11em;
    top: -3px;
    color: #333333;
  }
  ::v-deep .el-timeline {
    padding-left: 150px;
  }
</style>
