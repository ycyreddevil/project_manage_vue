<template>
  <div class="app-container">
    <div class="filter-container">
      <el-link :type="messageType === 'tobereplied' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('tobereplied')">待回复</el-link>
      <el-link :type="messageType === 'hasreplied' ? 'primary' : 'info'" style="padding: 0px 10px" @click="queryByType('hasreplied')">已回复</el-link>
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
      <el-input v-model="key" placeholder="消息内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="类型" prop="id" align="center" width="150">
        <template slot-scope="{row}">
          <el-tag>
            {{ row.type | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column label="是否已读" prop="haveRead" align="center" width="150">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <el-tag>-->
      <!--            {{ row.haveRead | readFilter}}-->
      <!--          </el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="发送人" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.submitterName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复人" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.targetName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息内容" width="600" align="center">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间" width="150">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="messageType === 'tobereplied'" type="primary" size="mini" @click="showDialog(row.docId, row.type, row.id)">
            快速回复
          </el-button>
          <!--          <el-button size="mini" @click="handleModifyStatus(row,'draft')">-->
          <!--            标记已读-->
          <!--          </el-button>-->
          <!--          <el-button size="mini" @click="handleModifyStatus(row,'draft')">-->
          <!--            标记未读-->
          <!--          </el-button>-->
          <el-button v-else size="mini" type="primary" @click="jumpDynamic(row.docId, row.type)">
            查看记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
    <el-dialog width="25%" :visible.sync="dialogVisible" title="回复消息弹出框">
      <el-input v-model="opinion" label="回复消息" placeholder="请输入回复消息" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="quickComment(row.docId, row.type, row.id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import permission from '@/directive/permission/permission'
import Pagination from '@/components/Pagination/index'
import * as message from '@/api/message'

export default {
  name: 'MessageIndex',
  filters: {
    typeFilter(status) {
      const statusMap = {
        0: '项目评论',
        1: '任务评论'
      }
      return statusMap[status]
    },
    readFilter(status) {
      const statusMap = {
        0: '未读',
        1: '已读'
      }
      return statusMap[status]
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
        type: 0,
        sort: '+id',
        dateRange: [],
        startTime: undefined,
        endTime: undefined
      },
      quickCommentQuery: {
        docId: 0,
        id: 0,
        type: 0
      },
      opinion: '',
      dialogVisible: false,
      chooseId: 0,
      messageType: 'tobereplied',
      content: ''
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    queryByType(type) {
      this.messageType = type
      if (type === 'tobereplied') {
        this.getToBeReplied()
      } else if (type === 'hasreplied') {
        this.getHaveReplied()
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
      if (this.messageType === 'tobereplied') {
        this.getToBeReplied()
      } else if (this.messageType === 'hasreplied') {
        this.getHaveReplied()
      }
    },
    getToBeReplied() {
      message.getToBeReplied(this.listQuery).then(res => {
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
    getHaveReplied() {
      message.getHaveReplied(this.listQuery).then(res => {
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
    jumpDynamic(docId, type) {
      if (type === 0) {
        this.$router.push('/project/detail/' + docId)
      } else {
        this.$router.push('/task/detail/' + docId)
      }
    },
    quickComment() {
      message.quickComment(this.quickCommentQuery).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '回复成功',
            type: 'success'
          })
          this.dialogVisible = false
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
    showDialog(docId, type, parentId) {
      this.dialogVisible = true
      this.quickCommentQuery.docId = docId
      this.quickCommentQuery.type = type
      this.quickCommentQuery.parentId = parentId
    }
  }
}
</script>
