import { InjectionToken } from "@angular/core";
import { Task } from "../shared/task";

/* 
    Add new interface for deleting a task, interface segregation principle.
*/
export interface IDeleteTaskService {
    deleteTask(id: Task['id']): Promise<void>;
}

export const DELETE_TASK_SERVICE = new InjectionToken('IDeleteTaskService');
