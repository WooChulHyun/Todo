import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { navItem } from '../../navItem.type';

@Component({
  selector: 'app-todo-nav',
  templateUrl: './todo-nav.component.html',
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent implements OnInit {
  @Output() sendCurrentState = new EventEmitter();
  currentState = 'All';
  states: navItem[] = ['All', 'Active', 'Completed'];

  constructor() {}

  ngOnInit() {}

  changeState(state: string) {
    this.currentState = state;
    this.sendCurrentState.emit(state);
  }
}
