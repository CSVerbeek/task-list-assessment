import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TaskStatus, TaskStatuses } from '../../shared/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskFormValue } from '../shared/types/task-form-value.type';
import { Observable } from 'rxjs';

@Component({
    selector: 'tla-task-form',
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
    @Input()
    task$?: Observable<Task | undefined>;

    @Output()
    submitted = new EventEmitter<TaskFormValue & { id?: Task['id'] }>();

    private editId?: number;

    readonly taskStatusValues: TaskStatus[] = [...TaskStatuses];

    taskForm: FormGroup<TaskForm> = new FormGroup({
        title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        status: new FormControl<TaskStatus>('new', { nonNullable: true, validators: [Validators.required] }),
    });

    ngOnInit(): void {
        if (this.task$) {
            this.task$.subscribe({
                next: task => {
                    if(task) {
                        const { id, ...taskFormValue } = task;
                        this.taskForm.setValue(taskFormValue);
                        this.editId = id;
                    }
                }
            });
        }
    }

    onSubmit(): void {
        if (!this.taskForm.valid) {
            return;
        }
        const formValue: Partial<TaskFormValue & { id?: Task['id'] }> = this.taskForm.value;
        if (this.editId) {
            formValue.id = this.editId;
        }
        this.submitted.emit(formValue as TaskFormValue & { id?: Task['id'] });
    }
}

/*
    When the desired result type (TaskFormValue) changes we get a compilation error since the type of the form itself changes with it
*/
type TaskForm = { [Property in keyof TaskFormValue]: FormControl<TaskFormValue[Property]> };
