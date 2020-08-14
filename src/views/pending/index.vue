<template>
  <div class="app-container">
    <div class="filter-container">
      <el-link :type="pendingType === 'tobeapproved' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('tobeapproved')">待处理</el-link>
      <el-link :type="pendingType === 'hasapproved' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('hasapproved')">已处理</el-link>
      <el-link :type="pendingType === 'hassubmitted' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('hassubmitted')">已提交</el-link>
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
      <el-table-column label="提交人" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.submitterName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交描述" width="500" align="center">
        <template slot-scope="{row}">
          <span v-html="row.desc" />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusTextFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="完成情况占比" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.percent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="showTaskDetail(row.id)">
            查看所属任务
          </el-button>
          <el-button size="mini" type="success" @click="agree(row.id)">
            审批通过
          </el-button>
          <el-button size="mini" type="danger" @click="showDialog(row.id)">
            审批驳回
          </el-button>
          <el-popover
            placement="bottom"
            :title="popoverTitle"
            width="400"
            trigger="click"
          >
            <div v-for="(attachment,index) in JSON.parse(row.attachment)" :key="index">
              <el-link icon="el-icon-document" :href="'http://localhost:5555' + attachment">
                {{ index+1 }}.{{ attachment.substring(attachment.lastIndexOf('/')+1, attachment.length-1) }}
              </el-link>
            </div>
            <el-button slot="reference" style="margin-left: 10px" size="mini" type="info">查看附件</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
    <el-dialog width="25%" :visible.sync="dialogVisible" title="审批意见弹出框">
      <el-input v-model="opinion" label="审批意见" placeholder="请输入审批意见" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="disagree">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
import * as pending from '@/api/pending'
import permission from '@/directive/permission/permission'
export default {
  name: 'PendingIndex',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'primary',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusTextFilter(text) {
      const statusMap = {
        0: '已提交',
        1: '已审批',
        2: '已驳回'
      }
      return statusMap[text]
    }
  },
  directives: { waves, permission },
  components: { Pagination },
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
      opinion: '',
      dialogVisible: false,
      chooseId: 0,
      popoverTitle: '查看附件',
      pendingType: 'tobeapproved'
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    queryByType(type) {
      this.pendingType = type
      if (type === 'tobeapproved') {
        this.getToBeApproved()
      } else if (type === 'hasapproved') {
        this.getHasApproved()
      } else if (type === 'hassubmitted') {
        this.getMySubmitted()
      }
    },
    showTaskDetail(id) {
      this.$router.push('/task/detail/' + id)
    },
    handleFilter() {
      this.getPageList()
    },
    onPick(dateRange) {
      this.listQuery.startTime = dateRange[0]
      this.listQuery.endTime = dateRange[1]
    },
    getPageList() {
      if (this.pendingType === 'tobeapproved') {
        this.getToBeApproved()
      } else if (this.pendingType === 'hasapproved') {
        this.getHasApproved()
      } else if (this.pendingType === 'hassubmitted') {
        this.getMySubmitted()
      }
    },
    getToBeApproved() {
      pending.getToBeApprovedList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.list = JSON.parse(res.result)
          this.total = res.total
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
    getHasApproved() {
      pending.getHaveApprovedList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.list = JSON.parse(res.result)
          this.total = res.total
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
    getMySubmitted() {
      pending.getMySubmitList(this.listQuery).then(res => {
        if (res.code === 200) {
          this.list = JSON.parse(res.result)
          this.total = res.total
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
    agree(id) {
      this.$confirm('是否审批通过', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pending.agree({ taskRecordId: id }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '审批同意成功',
              type: 'success'
            })
            const index = this.list.findIndex(item => item.id === id)
            this.list.splice(index, 1)
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
    disagree() {
      this.dialogVisible = false
      this.$confirm('是否审批拒绝', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.opinion === '') {
          this.$message({
            message: '审批拒绝必须填写原因！',
            type: 'info'
          })
          return
        }
        pending.disagree({ taskRecordId: this.chooseId, opinion: this.opinion }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '审批拒绝成功',
              type: 'success'
            })
            const index = this.list.findIndex(item => item.id === this.chooseId)
            this.list.splice(index, 1)
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
    showDialog(id) {
      this.dialogVisible = true
      this.chooseId = id
    }
  }
}
</script>
