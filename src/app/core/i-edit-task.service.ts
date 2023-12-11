import { InjectionToken } from "@angular/core";
import { Task } from "../shared/task";

/* 
    Add new interface for updating a task, interface segregation principle.
*/
export interface IEditTaskService {
    editTask(task: Task): void;
}

export const EDIT_TASK_SERVICE = new InjectionToken('IEditTaskService');
