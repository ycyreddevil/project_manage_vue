<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="addMember">
        新增成员
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      stripe
      size="small"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="成员名" prop="id" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="showPersonDetail(row.userId)">{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成员id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成员手机号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目角色">
        <template slot-scope="{row}">
          <span>{{ row.projectRole }}</span>
        </template>
      </el-table-column>
      <el-table-column label="加盟日" align="center">
        <template slot-scope="{row}">
          <span>{{ row.modifyTime.replace('T', ' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status === 1 ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" @click="handleModifyStatus(row,'draft')">
            删除
          </el-button>
          <el-button type="warning" size="mini" @click="handleModifyStatus(row,'draft')">
            禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 300px; margin-left:20px;">
        <el-form-item label="姓名" prop="userName">
          <el-select
            ref="selectCharge"
            v-model="temp.userId"
            :loading="isSearchLoading"
            default-first-option
            :remote-method="getRemoteUserList"
            filterable
            remote
            placeholder="请选择项目成员"
            @change="changeCharge"
          >
            <el-option v-for="(item,index) in userList" :key="item+index" :label="item.userName" :value="item.userId" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="projectRole">
          <el-input v-model="temp.projectRole" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { findProjectMember, addOrUpdateProjectMember } from '@/api/project'
import { findUsers } from '@/api/user'
export default {
  name: 'ProjectMember',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      projectId: '',
      listLoading: false,
      tableKey: 0,
      list: [],
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '更新成员',
        create: '创建成员'
      },
      rules: {
        userName: [{ required: true, message: '用户必选', trigger: 'change' }],
        projectRole: [{ required: true, message: '项目角色必填', trigger: 'change' }]
      },
      isSearchLoading: false,
      temp: {
        userId: '',
        userName: '',
        projectId: Number.parseInt(this.$route.params.id),
        projectRole: '',
        status: 1
      },
      userList: []
    }
  },
  mounted() {
    this.projectId = this.$route.params.id
    findProjectMember({ projectId: Number.parseInt(this.projectId) }).then(res => {
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
    handleModifyStatus() {},
    showPersonDetail() {},
    addMember() {
      this.dialogFormVisible = true
    },
    getRemoteUserList(key) {
      if (key !== '') {
        this.isSearchLoading = true
        findUsers({ key: key }).then(res => {
          this.isSearchLoading = false
          this.userList = res.result
        })
      }
    },
    changeCharge(userId) {
      const user = this.userList.find(item => {
        return item.userId === userId
      })
      this.temp.userName = user.userName
    },
    createData() {
      addOrUpdateProjectMember(this.temp).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.list.push(res.result)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
        this.dialogFormVisible = false
      }).catch(res => {
        this.$message({
          message: res,
          type: 'error'
        })
        this.dialogFormVisible = false
      })
    },
    updateData() {
      console.log(111)
    }
  }
}
</script>
