import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todos } from '../../interfaces/todos';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  @Input() todos: Todos[];
  @Output() completeAll = new EventEmitter();
  @Output() removeCompletedTodo = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  get completetedTodosLen() {
    return this.todos.filter(item => {
      return item.completed;
    }).length;
  }

  get uncompletedTodoLen() {
    return this.todos.filter(item => {
      return !item.completed;
    }).length;
  }
}
