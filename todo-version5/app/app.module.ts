import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoFilterPipe } from './todo-filter.pipe';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';
import { TodoNavComponent } from './todos/todo-nav/todo-nav.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoFooterComponent } from './todos/todo-footer/todo-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoFilterPipe,
    TodoFormComponent,
    TodoNavComponent,
    TodoListComponent,
    TodoFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
