<template>
  <el-row type="flex" style="margin-bottom:1.5rem" justify="space-between">
    <el-col :span="8">
      <span style="margin-left:0.5rem;font-weight: bold;">{{ headerName }}</span>
    </el-col>
    <el-col :span="8" />
    <el-col :span="3">
      <a v-if="isShowHidden" style="margin-left:0.5rem;font-weight: bold;" @click="showMoreFunction">more</a>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'DetailHeader',
  props: {
    headerName: {
      type: String,
      required: true
    },
    showMoreFunction: {
      type: Function,
      default: () => {
        console.log('点击更多')
      }
    },
    isShowHidden: {
      type: Boolean,
      default: true
    }
  }
}
</script>
