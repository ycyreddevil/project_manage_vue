<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar draft'">
        <el-button v-loading="submitButtonLoading" style="margin-left: 10px;" type="success" @click="submitForm">
          提交
        </el-button>
        <el-button v-loading="draftButtonLoading" type="warning" @click="back">
          返回
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <Warning text="请填写任务名称、任务权重、任务时间、任务类别、任务负责人、任务描述、任务验收标准、任务需求来对该任务进行新增或修改。" />
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.taskName" :maxlength="100" name="name" required placeholder="请输入任务名称">
                任务名称
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="任务权重:" class="postInfo-container-item">
                    <el-input-number v-model="postForm.weight" :min="1" :max="100" placeholder="请输入任务权重" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="110px" label="任务类型:" class="postInfo-container-item">
                    <el-select ref="selectTaskType" v-model="postForm.taskType" default-first-option placeholder="请选择任务类型">
                      <el-option v-for="(item,index) in taskTypeOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="110px" label="任务负责人:" class="postInfo-container-item">
                    <el-select
                      ref="selectCharge"
                      v-model="postForm.chargeUserId"
                      :loading="isSearchLoading"
                      default-first-option
                      :remote-method="getRemoteUserList"
                      filterable
                      remote
                      placeholder="请选择任务负责人"
                      @change="changeCharge"
                    >
                      <el-option v-for="(item,index) in userList" :key="item+index" :label="item.userName" :value="item.userId" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="预计开始时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.startTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择预计开始时间" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="预计结束时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择预计结束时间" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="任务优先级:" class="postInfo-container-item">
                    <el-select v-model="postForm.priority" default-first-option placeholder="请选择任务优先级">
                      <el-option v-for="(item,index) in priorityOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item style="margin-bottom: 40px;" label-width="110px" label="任务描述:">
          <el-input v-model="postForm.taskDesc" rows="3" type="textarea" class="article-textarea" autosize placeholder="请输入任务描述" />
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="110px" label="需求描述:">
          <el-input v-model="postForm.requireDesc" rows="3" type="textarea" class="article-textarea" autosize placeholder="请输入需求描述" />
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label-width="110px" label="验收标准:">
          <el-input v-model="postForm.acceptanceCriteria" rows="3" type="textarea" class="article-textarea" autosize placeholder="请输入验收标准" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput/index'
import Warning from '@/views/project/components/ProjectAddOrUpdateWarning'
import Sticky from '@/components/Sticky'
import { validURL } from '@/utils/validate'
import { findUsers } from '@/api/user'
import { getTaskById } from '@/api/project'
import { addOrUpdateTask } from '@/api/task'

const defaultForm = {
  id: undefined,
  taskName: '',
  weight: 0,
  taskType: '',
  priority: 0,
  startTime: '',
  endTime: '',
  chargeUserId: '',
  chargeUserName: '',
  taskDesc: '',
  requireDesc: '',
  acceptanceCriteria: '',
  parentId: Number.parseInt(localStorage.getItem('parentId')),
  projectId: Number.parseInt(localStorage.getItem('projectId'))
}

export default {
  name: 'TaskAddOrUpdate',
  components: { MDinput, Warning, Sticky },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      taskTypeOptions: ['设计', '开发', '测试', '研究', '讨论', '界面'],
      priorityOptions: [1, 2, 3, 4],
      isSearchLoading: false,
      submitButtonLoading: false,
      draftButtonLoading: false,
      userList: [],
      addOrUpdateText: '新增'
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id > 0) {
      this.addOrUpdateText = '更新'
      getTaskById({ taskId: id }).then(res => {
        if (res.code === 200) {
          this.postForm = res.result
          // 处理负责人数据回显
          this.$refs.selectCharge.cachedOptions.push({
            currentLabel: res.result.chargeUserName,
            currentValue: res.result.chargeUserId,
            label: res.result.chargeUserName,
            value: res.result.chargeUserId
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    } else { this.addOrUpdateText = '新增' }
  },
  methods: {
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
      this.postForm.chargeUserName = user.userName
    },
    submitForm() {
      this.$confirm(`是否${this.addOrUpdateText}该项目?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addOrUpdateTask(this.postForm).then(res => {
          if (res.code === 200) {
            this.$router.replace('/task/distribute/' + res.result.id)
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
