import { Component, EventEmitter, Output } from '@angular/core';
import { TaskStatus, TaskStatuses } from '../../shared/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskFormValue } from '../shared/types/task-form-value.type';

@Component({
  selector: 'tla-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
    @Output()
    submitted = new EventEmitter<TaskFormValue>();

    readonly taskStatusValues: TaskStatus[] = [...TaskStatuses];

    taskForm: FormGroup<TaskForm> = new FormGroup({
        title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        status: new FormControl<TaskStatus>('new', { nonNullable: true, validators: [Validators.required] }),
    });

    onSubmit(): void {
        if(!this.taskForm.valid) {
            return;
        }
        const formValue: Partial<TaskFormValue> = this.taskForm.value;
        this.submitted.emit(formValue as TaskFormValue);
    }
}

/*
    When the desired result type (TaskFormValue) changes we get a compilation error since the type of the form itself changes with it
*/
type TaskForm = {[Property in keyof TaskFormValue]: FormControl<TaskFormValue[Property]>};
