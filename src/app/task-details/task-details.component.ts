import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../shared/task';

@Component({
    selector: 'tla-task-details',
    templateUrl: './task-details.component.html',
    styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
    readonly task$: Observable<Task | undefined>;

    constructor() {
        this.task$ = new Observable<Task | undefined>();
    }
}
