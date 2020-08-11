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
          <Warning text="请填写完成情况描述以及上传图片或文件作为附件进行任务完成情况审批。" />
        </el-row>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="200" menubar="" />
        </el-form-item>
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
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Warning from '@/views/project/components/ProjectAddOrUpdateWarning'
import Sticky from '@/components/Sticky/index'
import { validURL } from '@/utils/validate'
import { addOrUpdateTask } from '@/api/task'

const defaultForm = {
  id: undefined,
  taskId: 0,
  desc: '',
  attachment: ''
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
    const id = this.$route.params.id
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
    handleUploadSuccess(response, file, fileList) {
      console.log(response)
    },
    handleUploadError(response, file, fileList) {
      console.log(response)
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
        addOrUpdateTask(this.postForm).then(res => {
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
