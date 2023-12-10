import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { TaskDetailsComponent } from './task-details.component';


@NgModule({
    declarations: [
        TaskDetailsComponent
    ],
    imports: [
        CommonModule,
        TaskDetailsRoutingModule
    ]
})
export class TaskDetailsModule { }
