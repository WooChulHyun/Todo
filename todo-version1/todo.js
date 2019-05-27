let todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];
const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $customCheckbox = document.querySelector('.custom-checkbox');
const $deleteBtn = document.querySelector('.btn');

function generateId() {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

function render() {
  let html = '';
  let completedCount = 0;
  todos.forEach((item) => {
    html += `<li id="${item.id}" class="todo-item">
   <input class="custom-checkbox" type="checkbox" id="ck-${item.id}" ${
  item.completed ? 'checked' : ''
}>
   <label for="ck-${item.id}">${item.content}</label>
   <i class="remove-todo far fa-times-circle"></i>
 </li>\n`;
    if (item.completed) completedCount += 1;
  });
  $todos.innerHTML = html;

  document.querySelector('.completed-todos').innerHTML = completedCount;
  document.querySelector('.active-todos').innerHTML =        todos.length - completedCount;
}

$todos.onchange = function (e) {
  const id = +e.target.parentNode.id;

  todos = todos.map(todo => (todo.id === id
            ? Object.assign({}, todo, { completed: !todo.completed })
            : todo));
  render();
};

$todos.onclick = function (e) {
  if (!e.target.classList.contains('remove-todo')) return;
  todos = todos.filter(item => item.id !== +e.target.parentNode.id);
  render();
};

$inputTodo.onkeyup = function (e) {
  if ($inputTodo.value.trim() === '' || e.keyCode !== 13) return;

  todos = [
    { id: generateId(), content: $inputTodo.value, completed: false },
    ...todos
  ];
  $inputTodo.value = '';
  render();
};

$customCheckbox.onchange = function (e) {
  todos = todos.map(todo => Object.assign({}, todo, { completed: e.target.checked }));
  render();
};

$deleteBtn.onclick = function (e) {
  todos = todos.filter(item => !item.completed);
  render();
};

render();
