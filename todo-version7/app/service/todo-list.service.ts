import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Todos } from '../interfaces/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  appUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Todos[]> {
    return this.http.get<Todos[]>(this.appUrl);
  }

  addTodoList(payload: object) {
    return this.http.post<Todos[]>(this.appUrl, payload);
  }

  toggleCompleteTodo(todo: Todos) {
    return this.http.patch<Todos[]>(`${this.appUrl}/${todo.id}`, {
      completed: !todo.completed
    });
  }

  removeTodoList(todo: Todos) {
    return this.http.delete<Todos[]>(`${this.appUrl}/${todo.id}`);
  }

  completeAllTodos(checkbox: HTMLInputElement) {
    return this.http.patch<Todos[]>(this.appUrl, {
      completed: checkbox.checked
    });
  }

  removeAllCompleteTodo() {
    return this.http.delete<Todos[]>(`${this.appUrl}/completed`);
  }
}
