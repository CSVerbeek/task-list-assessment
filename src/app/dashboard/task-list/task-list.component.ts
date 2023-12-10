import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../shared/task';
import { ITaskService, TASK_SERVICE } from '../../i-task.service';
import { Router } from '@angular/router';

@Component({
    selector: 'tla-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
    readonly tasks$: Observable<Task[]>;

    constructor(@Inject(TASK_SERVICE) public taskService: ITaskService, private router: Router) {
        this.tasks$ = this.taskService.tasks$;
    }

    onTaskRowClick(id: Task['id']): void {
        this.router.navigate(['/task-details', id]);
    }
}
