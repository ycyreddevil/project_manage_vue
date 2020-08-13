<template>
  <aside>
    {{ text }}
    <a
      href="http://www.yelimed.cn/"
      target="_blank"
    >版权所有：业力集团 业力医疗器械有限公司</a>
  </aside>
</template>
<script>
export default {
  name: 'Warning',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
