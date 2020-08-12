<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-position="top">
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
          <Warning text="请填写完成情况描述以及上传图片或文件作为附件进行任务完成情况审批。" />
        </el-row>
        <el-form-item :prop="postForm.desc" style="margin-bottom: 30px" label="完成情况描述:">
          <Tinymce ref="editor" v-model="postForm.desc" :height="200" menubar="" default-text="请输入完成情况描述" />
        </el-form-item>
        <el-form-item :prop="postForm.percent" style="margin-bottom: 30px;" label="任务占比:">
          <el-input-number v-model="postForm.percent" :min="0" :max="100" label="请输入该任务占比" />
        </el-form-item>
        <el-form-item style="margin-bottom: 30px;" label="附件上传:">
          <el-upload
            ref="upload"
            class="upload"
            action="http://localhost:5555/api/FileUpload/fileUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传不超过10m的文件或图片</div>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Warning from '@/views/project/components/ProjectAddOrUpdateWarning'
import Sticky from '@/components/Sticky/index'
import { validURL } from '@/utils/validate'
import { addOrUpdateTaskRecord } from '@/api/task'

const defaultForm = {
  id: undefined,
  taskId: 0,
  desc: '',
  attachment: [],
  percent: 0
}

export default {
  name: 'Addorupdatetaskrecord',
  components: { Warning, Sticky, Tinymce },
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
      addOrUpdateText: '新增',
      fileList: []
      // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
      // { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
    }
  },
  mounted() {
    const id = Number.parseInt(this.$route.params.id)
    this.postForm.taskId = id
    if (id > 0) {
      this.addOrUpdateText = '更新'
      // getTaskById({ taskId: id }).then(res => {
      //   if (res.code === 200) {
      //     this.postForm = res.result
      //     // 处理负责人数据回显
      //     this.$refs.selectCharge.cachedOptions.push({
      //       currentLabel: res.result.chargeUserName,
      //       currentValue: res.result.chargeUserId,
      //       label: res.result.chargeUserName,
      //       value: res.result.chargeUserId
      //     })
      //   } else {
      //     this.$message({
      //       message: res.message,
      //       type: 'error'
      //     })
      //   }
      // })
    } else { this.addOrUpdateText = '新增' }
  },
  methods: {
    handleUploadSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.postForm.attachment.push(res.result)
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    handleUploadError(res, file, fileList) {
      this.$message({
        message: res.message,
        type: 'error'
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    submitForm() {
      this.$confirm(`是否${this.addOrUpdateText}该项目?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postForm.attachment = JSON.stringify(this.postForm.attachment)
        addOrUpdateTaskRecord(this.postForm).then(res => {
          if (res.code === 200) {
            this.$router.push('/task/index')
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
