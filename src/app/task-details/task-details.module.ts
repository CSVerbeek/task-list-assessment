import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { TaskDetailsComponent } from './task-details.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
        TaskDetailsComponent
    ],
    imports: [
        CommonModule,
        TaskDetailsRoutingModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class TaskDetailsModule { }
