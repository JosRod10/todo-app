import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private readonly STORAGE_KEY = 'todo_app_tasks';

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const savedTasks = localStorage.getItem(this.STORAGE_KEY);
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
  }

  private saveTasks(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  filterTasks(completed: boolean | null): Task[] {
    if (completed === null) return this.tasks;
    return this.tasks.filter((task) => task.completed === completed);
  }
}