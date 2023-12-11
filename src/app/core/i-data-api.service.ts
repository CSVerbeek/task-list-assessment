import { Observable } from "rxjs";
import { Task } from "../shared/task";
import { InjectionToken } from "@angular/core";

export interface IDataApiService {
    getTasks(): Observable<Task[]>;
    postTask(task: Omit<Task, 'id'>): Observable<Task>;
    deleteTask(id: Task['id']): Observable<void>;
}

export const DATA_API_SERVICE = new InjectionToken('IDataAccessService');