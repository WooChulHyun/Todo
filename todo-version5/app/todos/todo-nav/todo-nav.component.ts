import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { navItem } from '../../types/navItem.type';

@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {
  @Output() changeState = new EventEmitter();

  currentState: navItem = 'All';
  states: navItem[] = ['All', 'Active', 'Completed'];
  constructor() {}

  ngOnInit() {}

  changeCurrentState(state: navItem) {
    this.currentState = state;
    this.changeState.emit(this.currentState);
  }
}
