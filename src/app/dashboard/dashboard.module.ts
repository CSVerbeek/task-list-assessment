import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';


@NgModule({
    declarations: [
        DashboardComponent,
        TaskListComponent,
        SearchBarComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class DashboardModule { }
