import { Pipe, PipeTransform } from '@angular/core';
import { Todos } from '../interfaces/todos';
import { navItem } from 'src/app/types/navItem.type';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {
  transform(todos: Todos[], currentState: navItem): Todos[] {
    if (currentState === 'All') {
      return todos;
    } else if (currentState === 'Active') {
      return todos.filter(item => {
        return !item.completed;
      });
    } else if (currentState === 'Completed') {
      return todos.filter(item => {
        return item.completed;
      });
    }
  }
}
