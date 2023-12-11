import { InjectionToken } from "@angular/core";
import { Task } from "../shared/task";

/* 
    Add new interface for adding a task, interface segregation principle.
*/
export interface IAddTaskService {
    addTask(task: Omit<Task, 'id'>): void;
}

export const ADD_TASK_SERVICE = new InjectionToken('IAddTaskService');
