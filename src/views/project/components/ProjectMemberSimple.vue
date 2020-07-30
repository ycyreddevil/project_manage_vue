<template>
  <div>
    <detail-header header-name="项目团队" :show-more-function="showTeamManage" />
    <el-row v-if="memberList.length >= 1" class="elRow" type="flex" style="margin-bottom:1.5rem" justify="space-around">
      <el-col :span="10">
        <el-avatar v-if="memberList[0]" size="medium" :src="memberList[0].avatar" />
        <span v-if="memberList[0]">{{ memberList[0].userName }}({{ memberList[0].projectRole }})</span>
      </el-col>
      <el-col :span="10">
        <el-avatar v-if="memberList[1]" size="medium" :src="memberList[1].avatar" />
        <span v-if="memberList[1]">{{ memberList[1].userName }}({{ memberList[1].projectRole }})</span>
      </el-col>
    </el-row>
    <el-row v-if="memberList.length > 2" class="elRow" type="flex" style="margin-bottom:1.5rem" justify="space-around">
      <el-col :span="10">
        <el-avatar v-if="memberList[2]" size="medium" :src="memberList[2].avatar" />
        <span v-if="memberList[2]">{{ memberList[2].userName }}({{ memberList[2].projectRole }})</span>
      </el-col>
      <el-col :span="10">
        <el-avatar v-if="memberList[3]" size="medium" :src="memberList[3].avatar" />
        <span v-if="memberList[3]">{{ memberList[3].userName }}({{ memberList[3].projectRole }})</span>
      </el-col>
    </el-row>
    <el-row v-if="memberList.length > 4" class="elRow" type="flex" style="margin-bottom:1.5rem" justify="space-around">
      <el-col :span="10">
        <el-avatar v-if="memberList[4]" size="medium" :src="memberList[4].avatar" />
        <span v-if="memberList[4]">{{ memberList[4].userName }}({{ memberList[4].projectRole }})</span>
      </el-col>
      <el-col :span="10">
        <el-avatar v-if="memberList[5]" size="medium" :src="memberList[5].avatar" />
        <span v-if="memberList[5]">{{ memberList[5].userName }}({{ memberList[5].projectRole }})</span>
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
        this.memberList = JSON.parse(res.result)
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
      this.$emit('changeTab', 'team')
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
