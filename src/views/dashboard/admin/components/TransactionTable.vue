<template>
  <el-row>
    <el-table :data="list">
      <el-table-column prop="name" label="项目" />
      <el-table-column prop="code" label="编号" />
      <el-table-column label="完成率">
        <template slot-scope="{row}">
          <span>{{ row.complete_ratio }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="消耗">
        <template slot-scope="{row}">
          <span>{{ row.day }}天</span>
        </template>
      </el-table-column>
      <el-table-column prop="task_num" label="任务数" />
    </el-table>
  </el-row>
<!--  <el-table :data="list" style="width: 100%;padding-top: 15px;">-->
<!--    <el-table-column label="Order_No" min-width="200">-->
<!--      <template slot-scope="scope">-->
<!--        {{ scope.row.order_no | orderNoFilter }}-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column label="Price" width="195" align="center">-->
<!--      <template slot-scope="scope">-->
<!--        ¥{{ scope.row.price | toThousandFilter }}-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column label="Status" width="100" align="center">-->
<!--      <template slot-scope="{row}">-->
<!--        <el-tag :type="row.status | statusFilter">-->
<!--          {{ row.status }}-->
<!--        </el-tag>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--  </el-table>-->
</template>

<script>
import { getProjectAnalyse } from '@/api/dashboard'
export default {
  components: {
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    // this.fetchData()
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getProjectAnalyse().then(res => {
        if (res.code === 200) {
          this.list = res.result
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
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }
  }
}
</script>
