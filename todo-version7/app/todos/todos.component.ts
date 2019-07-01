import { Component, OnInit } from '@angular/core';
import { Todos } from '../interfaces/todos';
import { navItem } from '../types/navItem.type';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TodoListService } from '../service/todo-list.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todos[];

  state: string;
  appUrl: string = environment.url;

  constructor(private todoList: TodoListService, private http: HttpClient) {}

  ngOnInit() {
    this.state = 'All';
    this.todoList.getAll().subscribe(todo => (this.todos = todo));
  }

  generateID() {
    return this.todos.length
      ? Math.max(...this.todos.map(todo => todo.id)) + 1
      : 1;
  }

  addTodo(content: HTMLInputElement) {
    const payload = {
      id: this.generateID(),
      content: content.value,
      completed: false
    };
    if (content.value.trim()) {
      this.todoList.addTodoList(payload).subscribe(todo => (this.todos = todo));
    }
    content.value = '';
  }

  changeState(state: navItem) {
    this.state = state;
  }

  completeTodo(todo: Todos) {
    this.todoList
      .toggleCompleteTodo(todo)
      .subscribe(todos => (this.todos = todos));
  }

  removeTodo(todo: Todos) {
    this.todoList.removeTodoList(todo).subscribe(todos => (this.todos = todos));
  }

  completeAll(checkbox: HTMLInputElement) {
    this.todoList
      .completeAllTodos(checkbox)
      .subscribe(todo => (this.todos = todo));
  }

  removeCompletedTodo() {
    this.todoList
      .removeAllCompleteTodo()
      .subscribe(todo => (this.todos = todo));
  }
}
