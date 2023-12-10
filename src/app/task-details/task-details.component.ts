import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ITaskService, TASK_SERVICE } from '../i-task.service';
import { Task } from '../shared/task';

@Component({
    selector: 'tla-task-details',
    templateUrl: './task-details.component.html',
    styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
    task$: Observable<Task | undefined>;

    constructor(private route: ActivatedRoute, @Inject(TASK_SERVICE) private taskService: ITaskService) {
        this.task$ = this.route.paramMap
            .pipe(
                switchMap((params) => this.taskService.findById(Number(params.get('id')!))),
            );
    }
}
