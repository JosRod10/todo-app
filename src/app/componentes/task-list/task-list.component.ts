import { Component, inject } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../servicios/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  public taskService = inject(TaskService);
  newTaskTitle = '';
  filter: 'all' | 'completed' | 'pending' = 'all';
  darkMode = false;

  get tasks(): Task[] {
    const tasks = this.taskService.getTasks();
    if (this.filter === 'completed') return this.taskService.filterTasks(true);
    if (this.filter === 'pending') return this.taskService.filterTasks(false);
    return tasks;
  }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    }
  }

  // toggleDarkMode(): void {
  //   this.darkMode = !this.darkMode;
  //   document.body.classList.toggle('dark-mode', this.darkMode);
  // }
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute(
      'data-bs-theme', 
      this.darkMode ? 'dark' : 'light'
    );
    // Al cambiar el tema
    localStorage.setItem('themePreference', this.darkMode ? 'dark' : 'light');

    // Al iniciar el componente
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }
  }
}
