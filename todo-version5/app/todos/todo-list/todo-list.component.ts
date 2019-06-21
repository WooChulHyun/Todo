import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos;
  @Input() currentState;
  @Output() toggle = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
