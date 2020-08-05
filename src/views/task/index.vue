<template>
  <div class="app-container">
    <div class="filter-container">
      <el-link type="info" style="padding: 0px 10px">所有</el-link>
      <el-link type="info" style="padding: 0px 10px">未关闭</el-link>
      <el-link type="info" style="padding: 0px 10px">已完成</el-link>
      <el-link type="info" style="padding: 0px 10px">已延期</el-link>
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
      <el-input v-model="key" placeholder="任务名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
          <span class="link-type" @click="showTaskDetail(row.id)">{{ row.projectName }}</span>
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
      <el-table-column label="创建人" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.submitterName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权重比" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计开始时间">
        <template slot-scope="{row}">
          <span>{{ row.startTime.replace('T', ' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计结束时间">
        <template slot-scope="{row}">
          <span>{{ row.endTime.replace('T', ' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成进度(%)" align="center">
        <template slot-scope="{row}">
          <span>{{ row.progress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">
            删除
          </el-button>
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">
            删除
          </el-button>
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">
            删除
          </el-button>
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
  </div>
</template>

<script>
import { getTaskList } from '@/api/task'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'ProjectTask',
  directives: { waves },
  components: { Pagination },
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
        type: undefined,
        sort: '+id',
        dateRange: [],
        startTime: undefined,
        endTime: undefined
      }
    }
  },
  mounted() {
    getTaskList().then(res => {
      if (res.code === 200) {
        this.list = JSON.parse(res.result)
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
    getPageList() {
      getTaskList().then(res => {
        if (res.code === 200) {
          this.list = JSON.parse(res.result)
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
    handleFilter() {

    },
    handleModifyStatus() {},
    showTaskDetail() {
      this.$router.push('/task/detail')
    },
    addMember() {},
    onPick(dateRange) {
      this.listQuery.startTime = dateRange[0]
      this.listQuery.endTime = dateRange[1]
    }
  }
}
</script>
