<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar draft'">
        <el-button v-loading="submitButtonLoading" style="margin-left: 10px;" type="success" @click="submitForm">
          提交
        </el-button>
        <el-button v-loading="draftButtonLoading" type="warning" @click="draftForm">
          保存草稿
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <Warning />
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.name" :maxlength="100" name="name" required placeholder="请输入项目名称">
                项目名称
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="项目编号:" class="postInfo-container-item">
                    <el-input v-model="postForm.code" placeholder="请输入项目编号" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="110px" label="项目类型:" class="postInfo-container-item">
                    <el-select v-model="postForm.type" default-first-option placeholder="请选择项目类型">
                      <el-option v-for="(item,index) in projectTypeOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="110px" label="项目负责人:" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.chargeUserId"
                      :loading="isSearchLoading"
                      default-first-option
                      :remote-method="getRemoteUserList"
                      filterable
                      remote
                      placeholder="请选择项目负责人"
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
                    <el-date-picker v-model="postForm.startTime" type="date" format="yyyy-MM-dd" placeholder="请选择预计开始时间" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="预计结束时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.endTime" type="date" format="yyyy-MM-dd" placeholder="请选择预计结束时间" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="110px" label="团队名称:" class="postInfo-container-item">
                    <el-input v-model="postForm.teamName" placeholder="团队名称" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item style="margin-bottom: 40px;" label-width="110px" label="任务描述:">
          <el-input v-model="postForm.desc" rows="3" type="textarea" class="article-textarea" autosize placeholder="请输入任务描述" />
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

const defaultForm = {
  name: '',
  code: '',
  startTime: '',
  endTime: '',
  chargeUserId: '',
  chargeUserName: '',
  desc: '',
  teamName: ''
}

export default {
  name: 'ProjectAddOrUpdate',
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
      projectTypeOptions: ['研发项目', '运维项目', '管理项目'],
      isSearchLoading: false,
      submitButtonLoading: false,
      draftButtonLoading: false,
      userList: []
    }
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
    changeCharge(item) {
      this.postForm.chargeUserName = item.userName
    },
    submitForm() {

    },
    draftForm() {}
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