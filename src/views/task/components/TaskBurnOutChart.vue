<template>
  <div v-loading="loading" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getTaskBurndownChart } from '@/api/dashboard'

export default {
  name: 'TaskBurnOutChart',
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
      default: '350px'
    },
    taskId: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      chartData: [],
      loading: false
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
      this.loading = true
      getTaskBurndownChart({ taskId: Number.parseInt(this.taskId) }).then(res => {
        if (res.code === 200) {
          this.chartData = res.result
          this.chart = echarts.init(this.$el, 'macarons')
          this.setOptions(this.chartData)
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
    },
    setOptions(data) {
      this.chart.setOption({
        xAxis: {
          data: data.map(item => { return item.date }),
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        title: {
          text: '任务燃尽图',
          left: 'center',
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 30,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: '剩余{c}%',
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '剩余比率',
          itemStyle: {
            normal: {
              color: '#B0C4DE',
              lineStyle: {
                color: '#B0C4DE',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          areaStyle: {},
          data: data.map(item => { return item.value }),
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
