import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Task, TaskStatus, TaskStatuses } from '../../shared/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskFormValue } from '../shared/types/task-form-value.type';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'tla-task-form',
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit, OnDestroy {
    @Input()
    task$: Observable<Task | undefined> | undefined;

    @Output()
    submitted = new EventEmitter<TaskFormValue & { id?: Task['id'] }>();

    private editId: Task['id'] | undefined;
    readonly taskStatusValues: TaskStatus[] = [...TaskStatuses];

    taskForm: FormGroup<TaskForm> = new FormGroup({
        title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        status: new FormControl<TaskStatus>('new', { nonNullable: true, validators: [Validators.required] }),
    });
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        if (this.task$) {
            this.task$
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: task => {
                        if (task) {
                            const { id, ...taskFormValue } = task;
                            this.taskForm.setValue(taskFormValue);
                            this.editId = id;
                        }
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
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
