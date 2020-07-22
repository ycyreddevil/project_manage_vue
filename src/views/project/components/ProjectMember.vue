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
          <span>{{ row.modifyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
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
  name: 'ProjectMember',
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      list: [
        { userName: '余尧毅', userId: '10000000', mobile: '18970902698', status: '正常', modifyTime: '2015-11-11', projectRole: '项目经理' },
        { userName: '余昌运', userId: '10000001', mobile: '13576935550', status: '正常', modifyTime: '2017-9-18', projectRole: '产品经理' },
        { userName: '张三', userId: '10000002', mobile: '13544468884', status: '正常', modifyTime: '2016-9-18', projectRole: '工程师' }
      ]
    }
  },
  methods: {
    handleModifyStatus() {},
    showPersonDetail() {},
    addMember() {}
  }
}
</script>
