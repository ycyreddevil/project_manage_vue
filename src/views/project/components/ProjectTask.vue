<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="treeSpan">
        <v-org-tree
          v-if="taskTree"
          :props="props"
          style="height: 58.5rem;width: -webkit-fill-available;overflow: auto"
          horizontal
          :data="taskTree"
          collapsable
          expand-all
          :node-render="contentRender"
          @on-expand="onExpand"
          @on-node-click="nodeClick"
        />
      </el-col>
      <transition name="el-zoom-in-center">
        <el-col v-show="detailShow" :span="8">
          <el-form ref="form" class="chart-wrapper" :model="form" label-width="80px">
            <!--            <detail-header header-name="任务概述" :is-show-hidden="false" />-->
            <el-form-item label="任务名称" size="mini">
              {{ form.taskName }}
            </el-form-item>
            <el-form-item label="任务描述" size="mini">
              {{ form.taskDesc }}
            </el-form-item>
            <el-form-item label="任务类型" size="mini">
              {{ form.taskType }}
            </el-form-item>
            <el-form-item label="负责人" size="mini">
              {{ form.chargeUserName }}
            </el-form-item>
            <el-form-item label="创建人" size="mini">
              {{ form.submitterName }}
            </el-form-item>
            <el-form-item label="验收标准" size="mini">
              {{ form.acceptanceCriteria }}
            </el-form-item>
            <el-form-item label="任务权重">
              {{ form.weight }}
            </el-form-item>
            <el-form-item label="创建时间">
              {{ form.createTime }}
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showTaskDetail(form.id)">查看详情</el-button>
              <el-button @click="closeDetail">关闭</el-button>
              <el-button type="success" @click="addChildrenTask(form.id, form.projectId)">新增子任务</el-button>
              <!--              <el-button type="danger" @click="deleteTask(form.id)">删除子任务</el-button>-->
            </el-form-item>
          </el-form>
        </el-col>
      </transition>
    </el-row>
  </div>
</template>

<script>
import { getProjectTaskTree, getTaskById } from '@/api/project'
export default {
  name: 'ProjectTask',
  props: {
    projectId: {
      type: String
    },
    childrenTaskTree: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
      props: { id: 'id', label: 'label', children: 'children', expand: 'expand' },
      taskTree: {},
      zoom: 100,
      detailShow: false,
      treeSpan: 24
    }
  },
  computed: {
    labelColor(status) {
      return function(status) {
        if (status === 0) { return '#C0C0C0' } else if (status === 1) { return '#6495ED' } else if (status === 2) { return '#90EE90' } else if (status === 3) { return '#FF6347' } else { return '#F4A460' }
      }
    }
  },
  watch: {
    childrenTaskTree: {
      handler(newValue, oldValue) {
        this.taskTree = newValue
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
    if (this.childrenTaskTree && Object.keys(this.childrenTaskTree).length > 0) {
      this.taskTree = this.childrenTaskTree
    } else {
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
    }
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
    showTaskDetail(id) {
      this.$router.push('/task/detail/' + id)
    },
    nodeClick(event, data, expand) {
      console.log(data)
      if (data.id === 0) { return }
      this.treeSpan = 16
      this.detailShow = true
      // 查询任务明细
      getTaskById({ taskId: data.id }).then(res => {
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
    closeDetail() {
      this.treeSpan = 24
      this.detailShow = false
    },
    contentRender(h, data) {
      return h('div', {}, [
        h('el-avatar', {
          attrs: {
            size: 18,
            fit: 'fill'
          },
          style: {
            backgroundColor: this.labelColor(data.status)
          }
        }, data.chargeUserName),
        h('el-divider', {
          attrs: {
            direction: 'vertical'
          }
        }),
        h('span', data.label)
      ])
    },
    addChildrenTask(parentId, projectId) {
      localStorage.setItem('parentId', parentId)
      localStorage.setItem('projectId', projectId)
      this.$router.push('/task/addorupdate/-1')
    },
    // iterationTaskTree(childrenTask, id) {
    //   if (childrenTask.length > 0) {
    //     childrenTask.forEach((v, i) => {
    //       const temp_children = v.children
    //       if (v.id === id && temp_children.length > 0) {
    //         this.$message({
    //           message: '该任务存在子任务 无法删除',
    //           type: 'error'
    //         })
    //         return false
    //       } else if (v.id === id && temp_children.length === 0) {
    //         return true
    //       } else {
    //         this.iterationTaskTree(temp_children, id)
    //       }
    //     })
    //   }
    // },
    deleteTask(id) {
      // this.$confirm('是否确定删除该任务', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   // 判断是否有子任务 若有子任务则无法删除
      //   const childrenTask = this.taskTree.children
      //   if (childrenTask.length > 0) {
      //     childrenTask.forEach((v, i) => {
      //       let temp_children = v.children
      //       temp_children = temp_children.children
      //       if (temp_children.id === id && temp_children.length > 0) {
      //         this.$message({
      //           message: '该任务存在子任务 无法删除',
      //           type: 'error'
      //         })
      //         return false
      //       } else if (temp_children.id === id && temp_children.length === 0) {
      //         return true
      //       } else {
      //
      //       }
      //     })
      //   }
      //
      //
      //   deleteTask({ taskId: id }).then(res => {
      //     if (res.code === 200) {
      //       this.$message({
      //         message: '删除成功',
      //         type: 'success'
      //       })
      //     } else {
      //       this.$message({
      //         message: res,
      //         type: 'error'
      //       })
      //     }
      //   }).catch(res => {
      //     this.$message({
      //       message: res,
      //       type: 'error'
      //     })
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消'
      //   })
      // })
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
