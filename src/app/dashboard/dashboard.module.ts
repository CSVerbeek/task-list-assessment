import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
    declarations: [
        DashboardComponent,
        TaskListComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatTableModule
    ]
})
export class DashboardModule { }
