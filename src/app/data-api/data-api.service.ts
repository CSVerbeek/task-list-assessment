import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Task } from '../shared/task';

/*
    This service is a stub for an actual API. It simulates a GET request getting all tasks and a POST request adding a task.
*/
@Injectable({
    providedIn: 'root'
})
export class StubLocalDataApiService {
    private readonly tasks: Task[];

    constructor() {
        this.tasks = this.getTasksFromLocalStorage();
        this.saveTasksToLocalStorage();
    }

    getTasks(): Observable<Task[]> {
        return of([...this.tasks]).pipe(take(1));
    }

    postTask(task: Omit<Task, 'id'>): Observable<Task> {
        const newTask: Task = {
            id: Math.max(0, ...this.tasks.map(task => task.id)) + 1,
            ...task
        };
        this.tasks.push(newTask);
        this.saveTasksToLocalStorage();
        return of(newTask);
    }

    private saveTasksToLocalStorage(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    private getTasksFromLocalStorage(): Task[] {
        return JSON.parse(localStorage.getItem('tasks') ?? '[]');
    }
}
