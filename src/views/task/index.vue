<template>
  <div class="app-container">
    <div class="filter-container">
      <el-link :type="listQuery.type === '' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('')">全部</el-link>
      <el-link :type="listQuery.type === '0' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('0')">未开始</el-link>
      <el-link :type="listQuery.type === '1' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('1')">进行中</el-link>
      <el-link :type="listQuery.type === '2' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('2')">已完成</el-link>
      <el-link :type="listQuery.type === '3' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('3')">已延期</el-link>
      <el-link :type="listQuery.type === '4' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('4')">已取消</el-link>
      <el-date-picker
        v-model="listQuery.dateRange"
        class="filter-item"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="onPick"
      />
      <el-input v-model="listQuery.key" placeholder="任务名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      size="small"
      stripe
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="id" prop="id" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="P" align="center" width="50">
        <template slot-scope="{row}">
          <svg-icon width="1.5em" height="1.5em" :icon-class="row.priority" />
        </template>
      </el-table-column>
      <el-table-column label="所属项目" width="300" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="showProjectDetail(row.id)">{{ row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" width="300" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="showTaskDetail(row.id)">{{ row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusTextFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.submitterName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.chargeUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权重比" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.weight }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="预计开始时间">
        <template slot-scope="{row}">
          <span>{{ row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计结束时间">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成进度(%)" align="center">
        <template slot-scope="{row}">
          <span>{{ row.progress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250">
        <template slot-scope="{row}">
          <el-button v-permission="['项目成员']" type="text" @click="beginTask(row.id)">开始</el-button>
          <!--          <el-button type="text" v-permission="['项目成员']" @click="showEndTaskDialog(row.id)">结束</el-button>-->
          <el-button v-permission="['项目成员']" type="text" @click="cancelTask(row.id)">取消</el-button>
          <el-button v-permission="['admin', '项目经理']" type="text" @click="editTask(row.id)">编辑</el-button>
          <el-button v-permission="['项目经理', '项目成员']" type="text" @click="submitRecord(row.id)">提交任务完成情况</el-button>
          <el-button v-permission="['admin', '项目成员', '项目经理']" type="text" @click="showChildrenTask(row.id)">查看子任务</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
    <!-- 选择上级审批人 -->
    <el-dialog width="25%" :visible.sync="dialogVisible" title="选择审批人来对结束任务操作进行审批">
      <el-select
        ref="selectCharge"
        v-model="approverId"
        default-first-option
        placeholder="请选择项目负责人"
        @change="changeCharge"
      >
        <el-option v-for="(item,index) in userList" :key="item+index" :label="item.userName" :value="item.userId" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="endTask">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 子任务弹出框 -->
    <el-drawer
      size="70%"
      title="我是标题"
      :with-header="false"
      :visible.sync="drawerVisible"
      direction="btt"
      show-close
      modal
    ><project-task :children-task-tree="childrenTaskTree" /></el-drawer>
  </div>
</template>

<script>
import { getTaskList, beginTask, endTask, cancelTask, getChilrenTaskTree } from '@/api/task'
import { findApproverList } from '@/api/user'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
import permission from '@/directive/permission/permission'
import ProjectTask from '@/views/project/components/ProjectTask'
export default {
  name: 'TaskIndex',
  directives: { waves, permission },
  components: { Pagination, ProjectTask },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'primary',
        2: 'success',
        3: 'danger',
        4: 'warning'
      }
      return statusMap[status]
    },
    statusTextFilter(text) {
      const statusMap = {
        0: '未开始',
        1: '进行中',
        2: '已完成',
        3: '已延期',
        4: '已取消'
      }
      return statusMap[text]
    }
  },
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      key: '',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        type: '',
        sort: '+id',
        dateRange: [],
        startTime: undefined,
        endTime: undefined
      },
      approverId: '',
      dialogVisible: false,
      userList: [],
      chooseTaskId: undefined,
      drawerVisible: false,
      childrenTaskTree: {}
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    queryByType(type) {
      this.listQuery.type = type
      this.getPageList()
    },
    getPageList() {
      this.listLoading = true
      getTaskList(this.listQuery).then(res => {
        this.listLoading = false
        if (res.code === 200) {
          this.total = res.total
          this.list = JSON.parse(res.result)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      }).catch(res => {
        this.listLoading = false
        this.$message({
          message: res,
          type: 'error'
        })
      })
    },
    handleFilter() {
      this.getPageList()
    },
    handleModifyStatus() {},
    showTaskDetail(id) {
      this.$router.push('/task/detail/' + id)
    },
    showProjectDetail(id) {
      this.$router.push('/project/detail/' + id)
    },
    addMember() {},
    onPick(dateRange) {
      this.listQuery.startTime = dateRange[0]
      this.listQuery.endTime = dateRange[1]
    },
    beginTask(taskId) {
      this.$confirm('是否确定开始该任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        beginTask({ taskId: taskId }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            const temp = this.list.find(item => item.id === taskId)
            temp.status = 1
            const index = this.list.findIndex(item => item.id === taskId)
            this.list = this.list.splice(index, 1, temp)
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
    endTask() {
      this.dialogVisible = false
      this.$confirm('是否完成此任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        endTask({ taskId: Number.parseInt(this.chooseTaskId), approverId: Number.parseInt(this.approverId) }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            const temp = this.list.find(item => item.id === this.chooseTaskId)
            temp.status = 2
            const index = this.list.findIndex(item => item.id === this.chooseTaskId)
            this.list = this.list.splice(index, 1, temp)
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }).catch(res => {
          console.log(res)
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
    editTask(taskId) {
      this.$router.push('/task/addorupdate/' + taskId)
    },
    cancelTask(taskId) {
      this.$confirm('是否确定取消该任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelTask({ taskId: taskId }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            const temp = this.list.find(item => item.id === taskId)
            temp.status = 4
            const index = this.list.findIndex(item => item.id === taskId)
            this.list = this.list.splice(index, 1, temp)
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
    submitRecord(id) {
      this.$router.push('/task/addorupdatetaskrecord/' + id)
    },
    getRemoteApproverList() {
      findApproverList().then(res => {
        if (res.code === 200) {
          this.userList = res.result
        } else {
          this.$message({
            message: res,
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
    changeCharge(userId) {
      const user = this.userList.find(item => {
        return item.userId === userId
      })
      console.log(user)
    },
    showEndTaskDialog(taskId) {
      this.getRemoteApproverList()
      this.dialogVisible = true
      this.chooseTaskId = taskId
    },
    showChildrenTask(taskId) {
      console.log(taskId)
      this.chooseTaskId = taskId
      getChilrenTaskTree({ taskId: taskId }).then(res => {
        if (res.code === 200) {
          this.childrenTaskTree = res.result
          this.drawerVisible = true
          console.log(this.childrenTaskTree)
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
