import { Component } from '@angular/core';
import { TaskStatus, TaskStatuses } from '../../shared/task';

@Component({
  selector: 'tla-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
    taskStatusValues: TaskStatus[] = [...TaskStatuses];
}
