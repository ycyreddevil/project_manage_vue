<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="treeSpan">
        <v-org-tree
          v-if="taskTree"
          :props="props"
          style="height: 58.5rem;;width: -webkit-fill-available;overflow: auto"
          horizontal
          :data="taskTree"
          collapsable
          expand-all
          @on-expand="onExpand"
          @on-node-click="nodeClick"
        />
      </el-col>
      <transition name="el-zoom-in-center">
        <el-col v-show="detailShow" :span="8">
          <el-form ref="form" class="chart-wrapper" :model="form" label-width="80px">
            <detail-header header-name="任务概述" :is-show-hidden="false" />
            <el-form-item label="任务名称" size="mini">
              {{ form.name }}
            </el-form-item>
            <el-form-item label="任务描述" size="mini">
              {{ form.region }}
            </el-form-item>
            <el-form-item label="任务类型" size="mini">
              {{ form.date1 }}
            </el-form-item>
            <el-form-item label="负责人" size="mini">
              {{ form.date2 }}
            </el-form-item>
            <el-form-item label="验收标准" size="mini">
              {{ form.delivery }}
            </el-form-item>
            <el-form-item label="任务权重">
              {{ form.type }}
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查看详情</el-button>
              <el-button @click="closeDetail">关闭</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </transition>
    </el-row>
  </div>
</template>

<script>
import { getProjectTaskTree } from '@/api/project'
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'ProjectTask',
  components: { DetailHeader },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '绩效考核与产值',
        region: '任务可分门别类（研发、专利、项目申报、调研等），按照不同类别，可进行产值或绩效的统计',
        date1: '研发',
        date2: '余尧毅',
        delivery: '任务可分门别类（研发、专利、项目申报、调研等），按照不同类别，可进行产值或绩效的统计任务可分门别类（研发、专利、项目申报、调研等），按照不同类别，可进行产值或绩效的统计',
        type: '20%'
      },
      props: { id: 'id', label: 'label', children: 'children', expand: 'expand' },
      taskTree: {
        id: 0,
        label: '度量指标体系',
        children: [
          {
            id: 1,
            label: '交付质量',
            children: [
              {
                id: 11,
                label: '生产质量',
                children: [
                  {
                    id: 111,
                    label: '生产事件'
                  }
                ]
              },
              {
                id: 12,
                label: '开发质量',
                children: [
                  {
                    id: 121,
                    label: '项目开发缺陷密度'
                  }
                ]
              },
              {
                id: 13,
                label: '发布质量',
                children: [
                  {
                    id: 131,
                    label: '上线失败率',
                    children: [
                      {
                        id: 131,
                        label: '上线失败率',
                        children: [
                          {
                            id: 131,
                            label: '上线失败率',
                            children: [
                              {
                                id: 131,
                                label: '上线失败率'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 14,
                label: '过程质量',
                children: [
                  {
                    id: 141,
                    label: '项目过程符合度'
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '交付效能',
            children: [
              {
                id: 21,
                label: '交付能力',
                children: [
                  {
                    id: 211,
                    label: '功能点产出'
                  },
                  {
                    id: 212,
                    label: '代码行产出'
                  },
                  {
                    id: 213,
                    label: '上线投产次数'
                  },
                  {
                    id: 214,
                    label: '接收需求数'
                  },
                  {
                    id: 215,
                    label: '立项数'
                  },
                  {
                    id: 216,
                    label: '结项数'
                  },
                  {
                    id: 217,
                    label: '迭代速率'
                  },
                  {
                    id: 218,
                    label: '迭代完成率'
                  }
                ]
              },
              {
                id: 22,
                label: '交付效率',
                children: [
                  {
                    id: 221,
                    label: '人均产出功能点'
                  },
                  {
                    id: 222,
                    label: '项目生产率'
                  }
                ]
              }
            ]
          },
          {
            id: 3,
            label: '业务满意度',
            children: [
              {
                id: 31,
                label: '业务满意度'
              }
            ]
          },
          {
            id: 4,
            label: '交付价值',
            children: [
              {
                id: 41,
                label: '业务价值关键指标'
              }
            ]
          },
          {
            id: 5,
            label: '交付速度',
            children: [
              {
                id: 51,
                label: '需求评估速度',
                children: [
                  {
                    id: 511,
                    label: '需求响应度'
                  }
                ]
              },
              {
                id: 52,
                label: '开发速度',
                children: [
                  {
                    id: 521,
                    label: '完成度天数'
                  },
                  {
                    id: 522,
                    label: '完成度达标率'
                  },
                  {
                    id: 523,
                    label: '故事平均测试通过周期'
                  }
                ]
              },
              {
                id: 53,
                label: '发布速度',
                children: [
                  {
                    id: 531,
                    label: '首次交付天数'
                  },
                  {
                    id: 532,
                    label: '首次交付达标率'
                  },
                  {
                    id: 533,
                    label: '故事平均发布周期'
                  }
                ]
              },
              {
                id: 54,
                label: '燃尽图'
              },
              {
                id: 55,
                label: '一次测试通过率'
              }
            ]
          },
          {
            id: 6,
            label: '持续交付',
            children: [
              {
                id: 61,
                label: '技术债务率',
                url: 'https://world.taobao.com/'
              },
              {
                id: 62,
                label: 'DEVOPS成熟度',
                url: ' http://www.baidu.com'
              },
              {
                id: 63,
                label: 'DEVOPS健康度',
                url: ' https://www.google.com/'
              }
            ]
          }
        ]
      },
      zoom: 100,
      detailShow: false,
      treeSpan: 24
    }
  },
  mounted() {
    getProjectTaskTree({ projectId: this.projectId }).then(res => {
      if (res.code === 200) {
        this.taskTree = res.result
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
    collapse(list) {
      var _this = this
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false
        }
        child.children && _this.collapse(child.children)
      })
    },
    onExpand(e, data) {
      if ('expand' in data) {
        data.expand = !data.expand
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    onSubmit() {
      console.log('111')
    },
    nodeClick(event, data, expand) {
      this.treeSpan = 16
      this.detailShow = true
    },
    closeDetail() {
      this.treeSpan = 24
      this.detailShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart-wrapper {
    height: 58.5rem;
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
