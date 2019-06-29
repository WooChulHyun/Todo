import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todos } from 'src/app/interfaces/todos';
import { TodosComponent } from '../todos.component';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Output() addTodo = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
