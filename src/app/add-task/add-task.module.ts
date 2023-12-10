import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
        AddTaskRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ]
})
export class AddTaskModule { }
