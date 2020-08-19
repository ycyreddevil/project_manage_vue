<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import { getProjectTaskRatio } from '@/api/dashboard'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      getProjectTaskRatio().then(res => {
        if (res.code === 200) {
          const data = res.result
          this.chart = echarts.init(this.$el, 'macarons')
          this.chart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c}个 ({d}%)'
            },
            title: {
              text: '项目任务占比'
            },
            legend: {
              left: 'center',
              bottom: '10',
              data: data.map(item => { return item.name })
            },
            series: [
              {
                type: 'pie',
                roseType: 'radius',
                radius: [15, 95],
                center: ['50%', '38%'],
                data: data,
                animationEasing: 'cubicInOut',
                animationDuration: 2600
              }
            ]
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
