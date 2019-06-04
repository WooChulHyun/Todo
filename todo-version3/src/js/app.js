class Todo {
  constructor() {
    this.$inputTodo = document.querySelector('.input-todo');
    this.$todos = document.querySelector('.todos');
    this.$customCheckbox = document.querySelector('.custom-checkbox');
    this.$deleteBtn = document.querySelector('.btn');
    this.$nav = document.querySelector('.nav');
    this.navState = 'all';

    this.$todos.onchange = this.completedTodo.bind(this);
    this.$todos.onclick = this.removeTodo.bind(this);
    this.$inputTodo.onkeyup = this.createNewTodo.bind(this);
    this.$customCheckbox.onchange = this.checkAll.bind(this);
    this.$deleteBtn.onclick = this.deleteAll.bind(this);
    this.$nav.onclick = this.navChange.bind(this);

    this.getTodos();
  }

  generateId() {
    return this.$todos.childNodes.length
      ? +this.$todos.childNodes[0].id + 1
      : 1;
  }

  getTodos() {
    fetch('/todos')
      .then(res => res.json())
      .then(todoList => {
        this.render(todoList);
      })
      .catch(console.error);
  }

  render(todoList) {
    this.$inputTodo.value = '';
    let newTodos = [];
    if (this.navState === 'all') {
      newTodos = todoList;
    } else if (this.navState === 'active') {
      newTodos = todoList.filter(item => !item.completed);
    } else if (this.navState === 'completed') {
      newTodos = todoList.filter(item => item.completed);
    }

    let html = '';
    let completedCount = 0;
    newTodos.forEach(item => {
      html += `<li id="${item.id}" class="todo-item">
       <input class="custom-checkbox" type="checkbox" id="ck-${item.id}" ${
  item.completed ? 'checked' : ''
}>
       <label for="ck-${item.id}">${item.content}</label>
       <i class="remove-todo far fa-times-circle"></i>
     </li>\n`;
      if (item.completed) completedCount += 1;
    });
    this.$todos.innerHTML = html;

    document.querySelector('.completed-todos').innerHTML = completedCount;
    document.querySelector('.active-todos').innerHTML =            newTodos.length - completedCount;
  }

  changeComplete(itemId, e) {
    fetch(`/todos/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: e.target.checked })
    })
      .then(res => res.json())
      .then(todoList => {
        this.render(todoList);
      })
      .catch(console.error);
  }

  completedTodo(e) {
    this.changeComplete(+e.target.parentNode.id, e);
  }

  removeTodoList(itemId) {
    fetch(`/todos/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(todoList => {
        this.render(todoList);
      })
      .catch(console.error);
  }

  removeTodo(e) {
    if (!e.target.classList.contains('remove-todo')) return;
    this.removeTodoList(+e.target.parentNode.id);
  }

  createNewTodoList() {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.generateId(),
        content: this.$inputTodo.value,
        completed: false
      })
    })
      .then(res => res.json())
      .then(todoList => {
        this.render(todoList);
      })
      .catch(console.error);
  }

  createNewTodo(e) {
    if (this.$inputTodo.value.trim() === '' || e.keyCode !== 13) return;
    this.createNewTodoList();
  }

  checkAllList(e) {
    fetch('/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: e.target.checked })
    })
      .then(res => res.json())
      .then(todoList => {
        this.render(todoList);
      })
      .catch(console.error);
  }

  checkAll(e) {
    this.checkAllList(e);
  }

  deleteAllList() {
    fetch('/todos/completed', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(todoList => {
        this.render(todoList);
      })
      .catch(console.error);
  }

  deleteAll() {
    this.deleteAllList();
  }

  navChange(e) {
    if (e.target.nodeName !== 'LI') return;

    [...this.$nav.children].forEach(item => {
      item.classList.remove('active');
    });

    e.target.classList.add('active');

    this.navState = e.target.id;
    this.getTodos();
  }
}

const todo = new Todo();
