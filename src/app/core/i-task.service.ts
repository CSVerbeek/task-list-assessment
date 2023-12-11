import { Observable } from "rxjs";
import { Task } from "../shared/task";
import { InjectionToken } from "@angular/core";

/*
    An interface that defines the contract of the service to be used. Makes it easier to create mock objects for testing or stubs during
    development.
*/
export interface ITaskService {
    readonly tasks$: Observable<Task[]>;
    
    findById(id: Task['id']): Observable<Task | undefined>;
}

/*
    Needs to be used for injecting an implementation of ITaskService. Since this service should be a single instance, I decided to place
    the injection token here. That way every component/service that needs a dependency on ITaskService gets the token from the same place.
*/
export const TASK_SERVICE = new InjectionToken('ITaskService');
