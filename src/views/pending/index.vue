<template>
  <div class="app-container">
    <div class="filter-container">
      <el-link type="info" style="padding: 0px 10px">所有</el-link>
      <el-link type="info" style="padding: 0px 10px">待处理</el-link>
      <el-link type="info" style="padding: 0px 10px">已处理</el-link>
      <el-link type="info" style="padding: 0px 10px">已提交</el-link>
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
      <el-table-column label="任务名称" width="500" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="showTaskDetail(row.id)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="指派给" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成者" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权重比" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计用时" width="80">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已消耗" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.usedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="%" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.percent }}</span>
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
  </div>
</template>

<script>
export default {
  name: 'PendingIndex',
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
        { id: 1, priority: '2', name: '开发开发开发开开发开发开发开发开发开发开发开发开发开发开发发开发开发开发开发开发开发开发', status: '开发中', userName: '余尧毅', weight: '20', time: '30天', usedTime: '10天', percent: '10%' },
        { id: 1, priority: '1', name: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', status: '已完成', userName: '余昌运', weight: '30', time: '40天', usedTime: '20天', percent: '2%' },
        { id: 1, priority: '4', name: '调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研调研', status: '已延期', userName: '杨海明', weight: '10', time: '50天', usedTime: '30天', percent: '30%' }
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
