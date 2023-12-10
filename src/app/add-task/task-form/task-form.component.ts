import { Component } from '@angular/core';
import { TaskStatus, TaskStatuses } from '../../shared/task';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskFormValue } from '../shared/types/task-form-value.type';

@Component({
  selector: 'tla-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
    readonly taskStatusValues: TaskStatus[] = [...TaskStatuses];

    taskForm: FormGroup<TaskForm> = new FormGroup({
        title: new FormControl<string>('', { nonNullable: true }),
        description: new FormControl<string>('', { nonNullable: true }),
        status: new FormControl<TaskStatus>('new', { nonNullable: true }),
    });

    onSubmit(): void {
        if(!this.taskForm.valid) {
            return;
        }
        const form: Partial<TaskFormValue> = this.taskForm.value;
        console.log(form);
    }
}

/*
    When the desired result type (TaskFormValue) changes we get a compilation error since the type of the form itself changes with it
*/
type TaskForm = {[Property in keyof TaskFormValue]: FormControl<TaskFormValue[Property]>};
