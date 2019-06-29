import { Component, OnInit } from '@angular/core';
import { Todos } from '../interfaces/todos';
import { navItem } from '../types/navItem.type';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todos[];

  state: string;
  appUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.state = 'All';
    this.http
      .get<Todos[]>(this.appUrl)
      .subscribe(todos => (this.todos = todos));
  }

  generateID() {
    return this.todos.length
      ? Math.max(...this.todos.map(todo => todo.id)) + 1
      : 1;
  }

  addTodo(content: HTMLInputElement) {
    if (content.value.trim()) {
      this.http
        .post<Todos[]>(this.appUrl, {
          id: this.generateID(),
          content: content.value,
          completed: false
        })
        .subscribe(todo => (this.todos = todo));
      content.value = '';
    }
  }

  changeState(state: navItem) {
    this.state = state;
  }

  completeTodo(todo: Todos) {
    this.http
      .patch<Todos[]>(`${this.appUrl}/${todo.id}`, {
        completed: !todo.completed
      })
      .subscribe(todo => (this.todos = todo));
  }

  removeTodo(todo: Todos) {
    this.http
      .delete<Todos[]>(`${this.appUrl}/${todo.id}`)
      .subscribe(todo => (this.todos = todo));
  }

  completeAll(checkbox: HTMLInputElement) {
    this.http
      .patch<Todos[]>(this.appUrl, { completed: checkbox.checked })
      .subscribe(todo => (this.todos = todo));
  }

  removeCompletedTodo() {
    this.http
      .delete<Todos[]>(`${this.appUrl}/completed`)
      .subscribe(todo => (this.todos = todo));
  }
}
