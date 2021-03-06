<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.key" placeholder="项目名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="项目类别" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in typeOpinions" :key="item" :label="item" :value="item" />
      </el-select>
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
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        立项
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      size="small"
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目编号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="showProjectDetail(row.id)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目负责人" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.chargeUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目类别" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目团队" width="110px">
        <template slot-scope="{row}">
          <span class="link-type" @click="getProjectTeam(row.id)">{{ row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" align="center" min-width="95">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="立项人" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.submitterName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="立项时间" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            发布
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogTeamVisible" title="项目团队成员">
      <el-table :data="projectTeam" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="userName" label="姓名" />
        <el-table-column prop="projectRole" label="角色" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTeamVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as project from '@/api/project'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ProjectIndex',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        发布: 'success',
        草稿: 'danger',
        审判中: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        type: undefined,
        sort: '+id',
        dateRange: [],
        startTime: undefined,
        endTime: undefined
      },
      typeOpinions: ['研发项目', '运维项目', '管理项目'],
      statusOptions: ['通过', '草稿', '拒绝'],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑项目',
        create: '创建项目'
      },
      dialogTeamVisible: false,
      projectTeam: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      project.findProjects(this.listQuery).then(response => {
        this.list = response.result
        this.total = response.total

        this.listLoading = false
      })
    },
    onPick(dateRange) {
      this.listQuery.startTime = dateRange[0]
      this.listQuery.endTime = dateRange[1]
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        code: 1,
        name: '',
        type: '',
        startTime: undefined,
        endTime: undefined,
        teamName: '',
        desc: '',
        level: 0,
        status: '',
        chargeUserId: '',
        chargeUserName: '',
        submitterId: this.$store.getters.userId,
        submitterName: this.$store.getters.name,
        createTime: undefined
      }
    },
    handleCreate() {
      this.$router.push('/project/addorupdate/-1')
    },
    handleUpdate(row) {
      this.$confirm('是否编辑该项目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push(`/project/addorupdate/${row.id}`)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          //   const index = this.list.findIndex(v => v.id === this.temp.id)
          //   this.list.splice(index, 1, this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Update Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    getProjectTeam(projectId) {
      project.findProjectMember({ projectId: projectId }).then(res => {
        this.projectTeam = JSON.parse(res.result)
        this.dialogTeamVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = Object.keys(this.list[0])
        const data = this.formatJson(tHeader)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    showProjectDetail(id) {
      // 跳转到项目详情页
      this.$router.push('/project/detail/' + id)
    }
  }
}
</script>
