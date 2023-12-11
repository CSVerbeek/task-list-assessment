import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITaskService } from './i-task.service';
import { Task } from '../shared/task';
import { Inject, Injectable } from '@angular/core';
import { DATA_API_SERVICE, IDataApiService } from './i-data-api.service';
import { IAddTaskService } from './i-add-task.service';
import { IDeleteTaskService } from './i-delete-task.service';
import { IEditTaskService } from './i-edit-task.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService implements ITaskService, IAddTaskService, IEditTaskService, IDeleteTaskService {
    private readonly _tasks$ = new BehaviorSubject<Task[]>([]);
    readonly tasks$: Observable<Task[]> = this._tasks$.asObservable();

    constructor(@Inject(DATA_API_SERVICE) private dataApi: IDataApiService) {
        this.dataApi.getTasks()
            .subscribe({
                next: tasks => {
                    this._tasks$.next(tasks);
                }
            });
    }

    findById(id: Task['id']): Observable<Task | undefined> {
        return this.tasks$.pipe(
            map(tasks => tasks.find(task => task.id === id))
        );
    }

    async addTask(task: Omit<Task, 'id'>): Promise<void> {
        // It's ok to cast to a promise here, since the new task is not used and we expect the API calls Observable to finish
        return firstValueFrom(this.dataApi.postTask(task)).then(newTask => {
            this._tasks$.next([...this._tasks$.value, newTask]);
        });
    }

    async editTask(task: Task): Promise<void> {
        return firstValueFrom(this.dataApi.putTask(task)).then(newTask => {
            const tasks = this._tasks$.value;
            tasks[tasks.findIndex(existingTask => existingTask.id === task.id)] = newTask;
            this._tasks$.next(tasks);
        });
    }

    async deleteTask(id: number): Promise<void> {
        return firstValueFrom(this.dataApi.deleteTask(id)).then(() => {
            const tasks = this._tasks$.value;
            tasks.splice(tasks.findIndex(task => task.id === id), 1);
            this._tasks$.next(tasks);
        });
    }
}
