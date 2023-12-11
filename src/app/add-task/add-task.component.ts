import { Component, Inject } from '@angular/core';
import { ADD_TASK_SERVICE, IAddTaskService } from '../core/i-add-task.service';
import { TaskFormValue } from './shared/types/task-form-value.type';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Task } from '../shared/task';
import { ITaskService, TASK_SERVICE } from '../core/i-task.service';
import { EDIT_TASK_SERVICE, IEditTaskService } from '../core/i-edit-task.service';

@Component({
    selector: 'tla-add-task',
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
    task$: Observable<Task | undefined>;

    constructor(
        @Inject(TASK_SERVICE) private taskService: ITaskService,
        @Inject(ADD_TASK_SERVICE) private addTaskService: IAddTaskService,
        @Inject(EDIT_TASK_SERVICE) private editTaskService: IEditTaskService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.task$ = this.route.paramMap
            .pipe(
                switchMap((params) => params.get('id') ? this.taskService.findById(Number(params.get('id')!)) : of(undefined)),
            );
    }

    onTaskFormSubmitted(formValue: TaskFormValue & { id?: Task['id'] }) {
        if (formValue.id) {
            this.editTaskService.editTask(formValue as TaskFormValue & { id: Task['id'] });
        } else {
            this.addTaskService.addTask(formValue);
        }
        this.router.navigate(['/dashboard']);
    }
}
