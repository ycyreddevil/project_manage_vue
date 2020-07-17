<template>
  <el-row>
    <el-table :data="list">
      <el-table-column prop="name" label="项目" />
      <el-table-column prop="code" label="编号" />
      <el-table-column prop="perfect" label="完成率" />
      <el-table-column prop="last" label="消耗" />
      <el-table-column prop="taskNum" label="任务数" />
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
import { transactionList } from '@/api/remote-search'
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
      list: [
        { name: '全自动核酸提取工作站', code: 'YL-YQ-201807', perfect: '56%', taskNum: 20, last: '10h' },
        { name: '液基薄层细胞制片机OEM', code: 'YL-YQ-201804', perfect: '20%', taskNum: 30, last: '10h' },
        { name: '液基寄生虫前处理系统', code: 'YL-SB-201701', perfect: '100%', taskNum: 70, last: '10h' },
        { name: '寄生虫卵试剂盒一代技改项目（星火）', code: 'YL-XH3-1901', perfect: '16%', taskNum: 80, last: '10h' },
        { name: '全自动核酸提取工作站', code: 'YL-YQ-201807', perfect: '56%', taskNum: 20, last: '10h' },
        { name: '液基薄层细胞制片机OEM', code: 'YL-YQ-201804', perfect: '20%', taskNum: 30, last: '10h' },
        { name: '液基寄生虫前处理系统', code: 'YL-SB-201701', perfect: '100%', taskNum: 70, last: '10h' },
        { name: '寄生虫卵试剂盒一代技改项目（星火）', code: 'YL-XH3-1901', perfect: '16%', taskNum: 80, last: '10h' }
      ]
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
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
