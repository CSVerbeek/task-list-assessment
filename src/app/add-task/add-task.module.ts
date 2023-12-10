import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTaskRoutingModule } from './add-task-routing.module';
import { AddTaskComponent } from './add-task.component';
import { TaskFormComponent } from './task-form/task-form.component';


@NgModule({
    declarations: [
        AddTaskComponent,
        TaskFormComponent
    ],
    imports: [
        CommonModule,
        AddTaskRoutingModule
    ]
})
export class AddTaskModule { }
