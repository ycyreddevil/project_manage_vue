<!--<template>-->
<!--  <div class="reply-item">-->
<!--    <div class="reply-content-block">-->
<!--      <div class="reply-content">-->
<!--        <p>{{ content }}</p>-->
<!--      </div>-->
<!--      <div class="comment-func inline-block">-->
<!--        <span class="pull-right comment-tools ml15">-->
<!--          <a v-for="item in tools" :key="item.name" href="javascript:void(0)" class="ml10" data-placement="top" :title="item.title" @click="handleClickTool($event, item)">-->
<!--            <i v-if="item.icon" :class="item.icon" />-->
<!--            <span v-if="item.text">{{ item.text }}</span>-->
<!--          </a>-->
<!--        </span>-->
<!--        <span class="comment-meta inline-block">-->
<!--          <span> — </span>-->
<!--          <a target="_blank" href="javascript:void(0)" @click="handleClickAuthor($event)">{{ author }}</a>-->
<!--          <span class="comments-date">  ·  {{ time | filterTime }}</span>-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'ReplyItem',-->
<!--  filters: {-->
<!--    filterTime(value) {-->
<!--      if (!value) {-->
<!--        return '未知时间'-->
<!--      }-->
<!--      if (Object.prototype.toString.call(value) === '[object String]') {-->
<!--        return value-->
<!--      }-->
<!--      if (value === '' || isNaN(value)) {-->
<!--        return '未知时间'-->
<!--      }-->
<!--      if (value <= 0) {-->
<!--        return '未知时间'-->
<!--      }-->
<!--      if (value < 10000000000) {-->
<!--        value *= 1000-->
<!--      }-->
<!--      const time = new Date(value)-->
<!--      const tY = time.getFullYear()-->
<!--      const tM = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1-->
<!--      const tD = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()-->
<!--      const th = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()-->
<!--      const tm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()-->
<!--      const ts = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()-->
<!--      const now = new Date()-->
<!--      const nY = now.getFullYear()-->
<!--      const nM = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1-->
<!--      const nD = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()-->
<!--      let result = ''-->
<!--      if (tY !== nY) {-->
<!--        result += tY + '年'-->
<!--      }-->
<!--      if (tM !== nM || tD !== nD) {-->
<!--        result += tM + '月'-->
<!--        result += tD + '日'-->
<!--      }-->
<!--      if (result === '') {-->
<!--        result = th + ':' + tm + ':' + ts-->
<!--      }-->
<!--      return result-->
<!--    }-->
<!--  },-->
<!--  props: {-->
<!--    author: String,-->
<!--    content: String,-->
<!--    tools: Array,-->
<!--    time: [String, Number]-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--  },-->
<!--  methods: {-->
<!--    handleClickTool(event, tool) {-->
<!--      event.stopPropagation()-->
<!--      this.$emit('clickTool', this, tool)-->
<!--    },-->
<!--    handleClickAuthor(event) {-->
<!--      event.stopPropagation()-->
<!--      this.$emit('clickAuthor', this)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--  .ml10 {-->
<!--    margin-left: 10px !important;-->
<!--  }-->
<!--  .ml15 {-->
<!--    margin-left: 15px !important;-->
<!--  }-->
<!--  .pull-left {-->
<!--    float: left !important;-->
<!--  }-->
<!--  .pull-right {-->
<!--    float: right !important;-->
<!--  }-->
<!--  .reply-item {-->
<!--    padding-bottom: 10px;-->
<!--    padding-top: 10px;-->
<!--    border-bottom: 1px dashed rgba(0,0,0,0.09);-->
<!--    word-break: break-word;-->
<!--  }-->
<!--  .reply-item a {-->
<!--    color: #009a61;-->
<!--    text-decoration: none;-->
<!--    background: transparent;-->
<!--  }-->
<!--  .reply-item a:hover,-->
<!--  .reply-item a:active,-->
<!--  .reply-item a:focus {-->
<!--    outline: 0;-->
<!--  }-->
<!--  .reply-item p {-->
<!--    margin-bottom: 5px;-->
<!--  }-->
<!--  .comment-tools {-->
<!--    /*visibility: hidden;*/-->
<!--  }-->
<!--  .comment-meta {-->
<!--    color: #999;-->
<!--  }-->
<!--  .inline-block {-->
<!--    display: inline-block;-->
<!--  }-->
<!--</style>-->
