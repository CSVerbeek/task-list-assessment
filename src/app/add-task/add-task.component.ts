import { Component, Inject } from '@angular/core';
import { ADD_TASK_SERVICE, IAddTaskService } from '../i-add-task.service';
import { TaskFormValue } from './shared/types/task-form-value.type';

@Component({
  selector: 'tla-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
    constructor(@Inject(ADD_TASK_SERVICE) private addTaskService: IAddTaskService) {
    }

    onTaskFormSubmitted(formValue: TaskFormValue) {
        this.addTaskService.addTask(formValue);
    }
}
