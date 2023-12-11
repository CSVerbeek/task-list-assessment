import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Task } from '../shared/task';
import { IDataApiService } from '../core/i-data-api.service';

/*
    This service is a stub for an actual API. It simulates a GET request getting all tasks and a POST request adding a task.
*/
@Injectable({
    providedIn: 'root'
})
export class StubLocalDataApiService implements IDataApiService {
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

    deleteTask(id: number): Observable<void> {
        this.tasks.splice(this.tasks.findIndex(task => task.id === id), 1);
        this.saveTasksToLocalStorage();
        return of(undefined);
    }

    private saveTasksToLocalStorage(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    private getTasksFromLocalStorage(): Task[] {
        // added the filter because during development a task accidentally became null.
        // proper solution would be to filter on tasks that are correctly formatted
        // in a real implementation when you add something to local storage you might want to account for changes in the model, for example
        // with a version number and mapping
        return JSON.parse(localStorage.getItem('tasks') ?? '[]').filter((task: Task) => !!task);
    }
}
