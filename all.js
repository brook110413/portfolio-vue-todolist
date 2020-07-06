let app = new Vue({
  el: "#app",
  data: {
    newTodo: "",
    todoList: [],
    visibility: "all",
    cacheTodo: {},
    cacheTitle: "",
  },
  // 將localStorage
  created() {
    this.todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  },
  methods: {
    addTodo() {
      let value = this.newTodo.trim();
      let newId = Math.floor(Date.now());
      if (!value) {
        return;
      }
      this.todoList.push({
        id: newId,
        title: value,
        completed: false,
      });
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
      this.newTodo = "";
    },
    removeTodo(todo) {
      let newIndex = "";
      this.todoList.forEach(function (item, index) {
        if (todo.id === item.id) {
          newIndex = index;
        }
      });
      this.todoList.splice(newIndex, 1);
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },
    removeAllTodo() {
      this.todoList = [];
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },
    editTodo(item) {
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    doneEdit(item) {
      item.title = this.cacheTitle;
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
      this.cacheTitle = "";
      this.cacheTodo = {};
    },
    cancelEdit() {
      this.cacheTodo = {};
    },
  },
  computed: {
    filteredTodoList() {
      let newTodoList = [];
      if (this.visibility == "all") {
        newTodoList = this.todoList;
        return newTodoList;
      } else if (this.visibility == "active") {
        this.todoList.forEach(function (item) {
          if (!item.completed) {
            newTodoList.push(item);
          }
        });
        return newTodoList;
      } else if (this.visibility == "completed") {
        this.todoList.forEach(function (item) {
          if (item.completed) {
            newTodoList.push(item);
          }
        });
        return newTodoList;
      }
    },
    undone() {
      let num = 0;
      this.todoList.forEach(function (item) {
        if (!item.completed) {
          num += 1;
        }
      });
      return num;
    },
  },
});