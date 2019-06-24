import { Component, OnInit } from '@angular/core';
import { Todos } from '../interfaces/todos';
import { navItem } from '../types/navItem.type';

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

  state: string;

  constructor() {}

  ngOnInit() {
    this.state = 'All';
  }

  generateID() {
    return this.todos.length
      ? Math.max(...this.todos.map(todo => todo.id)) + 1
      : 1;
  }

  addTodo(content: HTMLInputElement) {
    this.todos = [
      { id: this.generateID(), content: content.value, completed: false },
      ...this.todos
    ];
    content.value = '';
  }

  changeState(state: navItem) {
    this.state = state;
  }

  completeTodo(todo: Todos) {
    this.todos = this.todos.map(item => {
      return todo.id === item.id
        ? { ...item, completed: !item.completed }
        : item;
    });
  }

  removeTodo(todo: Todos) {
    this.todos = this.todos.filter(item => {
      return todo.id !== item.id;
    });
  }

  completeAll(checkbox: HTMLInputElement) {
    this.todos = this.todos.map(item => {
      return { ...item, completed: checkbox.checked };
    });
  }

  removeCompletedTodo() {
    this.todos = this.todos.filter(item => {
      return !item.completed;
    });
  }
}
