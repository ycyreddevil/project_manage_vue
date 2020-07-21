<template>
  <div class="block">
    <DetailHeader header-name="最新动态" :show-more-function="showMoreDynamic" />
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'ProjectDynamic',
  components: {
    DetailHeader
  },
  data() {
    return {
      reverse: false,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15 00:00:00'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13 00:00:00'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11 00:00:00'
      }]
    }
  },
  methods: {
    showMoreDynamic() {
      console.log(111)
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
