import { Component } from '@angular/core';
import { TaskListComponent } from './componentes/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent], // Importa tu componente aquí
  template: `<app-task-list></app-task-list>`, // Usa el selector de tu componente
})
export class AppComponent {}
