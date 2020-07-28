<template>
  <div>
    <detail-header header-name="项目团队" :show-more-function="showTeamManage" />
    <el-row v-for="count in memberList.length" :key="count" class="elRow" type="flex" style="margin-bottom:1.5rem" justify="space-around">
      <el-col :span="10">
        <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span>{{ memberList[count-1].userName }}({{ memberList[count-1].projectRole }})</span>
      </el-col>
      <el-col :span="10">
        <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span>{{ memberList[count-1].userName }}({{ memberList[count-1].projectRole }})</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DetailHeader from '@/views/project/components/DetailHeader'
import { findProjectMember } from '@/api/project'

export default {
  name: 'ProjectMemberSimple',
  components: { DetailHeader },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      memberList: []
    }
  },
  mounted() {
    findProjectMember({ projectId: Number.parseInt(this.projectId) }).then(res => {
      if (res.code === 200) {
        this.memberList = res.result
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    }).catch(res => {
      this.$message({
        message: res.message,
        type: 'error'
      })
    })
  },
  methods: {
    showTeamManage() {
      console.log(111)
    }
  }
}
</script>
<style lang="scss" scoped>
  .elRow{
    span{
      margin-left: 5px;
      color: gray;
      vertical-align: middle;
    }
  }
</style>
