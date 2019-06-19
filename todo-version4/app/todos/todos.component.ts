import { Component, OnInit } from '@angular/core';
import { Todos } from '../todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todos[] = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  state = 'All';

  constructor() {}

  ngOnInit() {}

  generateID() {
    return this.todos.length
      ? Math.max(...this.todos.map(todo => todo.id)) + 1
      : 1;
  }

  addTodo(content) {
    this.todos = [
      { id: this.generateID(), content: content.value, completed: false },
      ...this.todos
    ];
    content.value = '';
  }

  toggle(todo) {
    this.todos = this.todos.map(item => {
      return todo.id === item.id
        ? { ...item, completed: !item.completed }
        : item;
    });
  }

  remove(todo) {
    this.todos = this.todos.filter(item => {
      return todo.id !== item.id;
    });
  }

  complteAll(complete) {
    this.todos = this.todos.map(item => {
      return { ...item, completed: complete.checked };
    });
  }

  removeCompleted() {
    this.todos = this.todos.filter(item => {
      return !item.completed;
    });
  }

  allClick() {
    this.state = 'All';
  }

  activeClick() {
    this.state = 'Active';
  }

  completedClick() {
    this.state = 'Completed';
  }

  get Todo() {
    if (this.state === 'All') {
      return this.todos;
    } else if (this.state === 'Active') {
      return this.todos.filter(item => {
        return !item.completed;
      });
    } else if (this.state === 'Completed') {
      return this.todos.filter(item => {
        return item.completed;
      });
    }
  }

  get comItemCount() {
    let count = 0;
    this.todos.forEach(item => {
      item.completed ? (count += 1) : (count += 0);
    });
    return count;
  }

  get notComItemCount() {
    let count = 0;
    this.todos.forEach(item => {
      !item.completed ? (count += 1) : (count += 0);
    });
    return count;
  }
}
