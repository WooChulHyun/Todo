class Todo {
  constructor(todos = []) {
    this.todos = todos;
    this.$inputTodo = document.querySelector('.input-todo');
    this.$todos = document.querySelector('.todos');
    this.$customCheckbox = document.querySelector('.custom-checkbox');
    this.$deleteBtn = document.querySelector('.btn');

    this.$todos.onchange = this.completedTodo.bind(this);
    this.$todos.onclick = this.removeTodo.bind(this);
    this.$inputTodo.onkeyup = this.createNewTodo.bind(this);
    this.$customCheckbox.onchange = this.checkAll.bind(this);
    this.$deleteBtn.onclick = this.deleteAll.bind(this);

    this.render();
  }

  generateId() {
    return this.todos.length
      ? Math.max(...this.todos.map(todo => todo.id)) + 1
      : 1;
  }

  render() {
    let html = '';
    let completedCount = 0;
    this.todos.forEach((item) => {
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
    document.querySelector('.active-todos').innerHTML =            this.todos.length - completedCount;
  }

  completedTodo(e) {
    const id = +e.target.parentNode.id;

    this.todos = this.todos.map(todo => (todo.id === id
                ? Object.assign({}, todo, { completed: !todo.completed })
                : todo));
    this.render();
  }

  removeTodo(e) {
    if (!e.target.classList.contains('remove-todo')) return;
    this.todos = this.todos.filter(
      item => item.id !== +e.target.parentNode.id
    );
    this.render();
  }

  createNewTodo(e) {
    if (this.$inputTodo.value.trim() === '' || e.keyCode !== 13) return;

    this.todos = [
      {
        id: this.generateId(),
        content: this.$inputTodo.value,
        completed: false
      },
      ...this.todos
    ];
    this.$inputTodo.value = '';
    this.render();
  }

  checkAll(e) {
    this.todos = this.todos.map(item => Object.assign({}, item, { completed: e.target.checked }));
    this.render();
  }

  deleteAll(e) {
    this.todos = this.todos.filter(item => !item.completed);
    this.render();
  }
}

const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];
const todoStart = new Todo(todos);
