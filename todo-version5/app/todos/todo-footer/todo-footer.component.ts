import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  @Input() todos;
  @Output() completeAll = new EventEmitter();
  @Output() removeCompleted = new EventEmitter();
  constructor() {}

  ngOnInit() {}

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
