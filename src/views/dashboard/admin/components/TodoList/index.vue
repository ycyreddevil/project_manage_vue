<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="新增待办事项" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('项') }} 剩余
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import Todo from './Todo.vue'
import { addOrUpdateSchedule, getSchedule, deleteSchedule } from '@/api/dashboard'
const STORAGE_KEY = 'todos'
const filters = {
  全部: todos => todos,
  进行中: todos => todos.filter(todo => !todo.done),
  完成: todos => todos.filter(todo => todo.done)
}
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => w,
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      visibility: '全部',
      filters,
      todos: [],
      schedule: {
        id: undefined,
        text: '',
        done: 0,
        submitterUserId: this.$store.getters.userId
      },
      list: []
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  mounted() {
    getSchedule().then(res => {
      if (res.code === 200) {
        this.todos = JSON.parse(res.result)
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
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      this.schedule.text = text
      addOrUpdateSchedule(this.schedule).then(res => {
        if (res.code === 200) {
          if (text.trim()) {
            this.todos.push({
              text,
              done: false
            })
            this.setLocalStorage()
          }
          e.target.value = ''
          this.$message({
            message: '新增成功',
            type: 'success'
          })
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
    },
    toggleTodo(todo) {
      todo.done = !todo.done
      todo.done = todo.done ? 1 : 0
      addOrUpdateSchedule(todo).then(res => {
        if (res.code === 200) {
          this.setLocalStorage()
          this.$message({
            message: '修改状态成功',
            type: 'success'
          })
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
    },
    deleteTodo(todo) {
      this.$confirm('是否删除该事项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(todo)
        deleteSchedule({ id: todo.id }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.todos.splice(this.todos.indexOf(todo), 1)
            this.setLocalStorage()
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
    editTodo({ todo, value }) {
      todo.text = value
      todo.done = todo.done ? 1 : 0
      addOrUpdateSchedule(todo).then(res => {
        if (res.code === 200) {
          this.setLocalStorage()
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
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
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorage()
      })
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
