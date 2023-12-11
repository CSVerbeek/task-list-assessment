import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ITaskService, TASK_SERVICE } from '../core/i-task.service';
import { Task } from '../shared/task';
import { DELETE_TASK_SERVICE, IDeleteTaskService } from '../core/i-delete-task.service';

@Component({
    selector: 'tla-task-details',
    templateUrl: './task-details.component.html',
    styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
    task$: Observable<Task | undefined>;

    constructor(
        private route: ActivatedRoute, 
        @Inject(TASK_SERVICE) private taskService: ITaskService,
        @Inject(DELETE_TASK_SERVICE) private deleteTaskService: IDeleteTaskService,
        private router: Router
    ) {
        this.task$ = this.route.paramMap
            .pipe(
                switchMap((params) => this.taskService.findById(Number(params.get('id')!))),
            );
    }

    deleteTask(taskId: Task['id']): void {
        this.deleteTaskService.deleteTask(taskId)
        .then(() => {
            this.router.navigate(['/dashboard']);
        });
    }
}
