<template>
  <div class="app-container">
    <div class="filter-container">
      <el-link type="info" style="padding: 0px 10px">所有</el-link>
      <el-link type="info" style="padding: 0px 10px">待回复</el-link>
      <el-link type="info" style="padding: 0px 10px">已回复</el-link>
      <el-link type="info" style="padding: 0px 10px">我的</el-link>
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
      <el-table-column label="状态" prop="id" align="center" width="150">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发送人" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息内容" width="600" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="showTaskDetail(row.id)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间" width="150">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">
            回复
          </el-button>
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">
            标记已读
          </el-button>
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">
            标记未读
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MessageIndex',
  filters: {
    statusFilter(status) {
      const statusMap = {
        已完成: 'success',
        开发中: 'primary',
        已延期: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      key: '',
      list: [
        { id: '待回复', priority: '2', name: '开发开发开发开开发开发开发开发开发开发开发开发开发开发开发发开发开发开发开发开发开发开发', status: '开发中', userName: '余尧毅', createTime: '2020-1-1 10:00:00' },
        { id: '已回复', priority: '1', name: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', status: '已完成', userName: '余昌运', createTime: '2020-1-1 10:00:00' },
        { id: '已提交', priority: '4', name: '调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研', status: '已延期', userName: '杨海明', createTime: '2020-1-1 10:00:00' }
      ]
    }
  },
  methods: {
    handleModifyStatus() {},
    showTaskDetail() {
      this.$router.push('/task/detail')
    },
    addMember() {}
  }
}
</script>
