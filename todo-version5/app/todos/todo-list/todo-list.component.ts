import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todos } from '../../interfaces/todos';
import { TodosComponent } from '../todos.component';
import { navItem } from 'src/app/types/navItem.type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todos[];
  @Input() currentState: navItem;
  @Output() completeTodo = new EventEmitter();
  @Output() removeTodo = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
