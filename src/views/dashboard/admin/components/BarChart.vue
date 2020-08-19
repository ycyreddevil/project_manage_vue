<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { getSubmissionStatus } from '@/api/dashboard'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      getSubmissionStatus().then(res => {
        if (res.code === 200) {
          let data = res.result
          data = data.map(item => {
            return {
              name: item.name,
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: item.list,
              animationDuration
            }
          })

          this.chart = echarts.init(this.$el, 'macarons')
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            title: {
              text: '提交状况（百分比）'
            },
            grid: {
              left: '2%',
              right: '2%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value',
              axisTick: {
                show: false
              }
            }],
            series: data
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
    }
  }
}
</script>
