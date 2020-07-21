<template>
  <div>
    <detail-header header-name="历史记录" :is-show-hidden="false" />
    <ul>
      <li>2012-06-05 10:28:36, 由 projectManager 创建。</li>
      <li>2012-06-05 11:07:41, 由 测试经理 创建测试单 #1 企业网站第一期测试任务 。</li>
      <li>2012-06-05 11:11:45, 由 projectManager 创建版本 #1 第一期版本 。</li>
      <li>2012-06-06 11:11:45, 由 projectManager 创建版本 #2 第二期版本 。</li>
    </ul>
  </div>
</template>
<script>
import DetailHeader from '@/views/project/components/DetailHeader'
export default {
  name: 'ProjectHistory',
  components: { DetailHeader }
}
</script>
<style lang="scss" scoped>
  li{
    margin: 5px 0px
  }
</style>
