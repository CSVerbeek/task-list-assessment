import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TASK_SERVICE } from './core/i-task.service';
import { ADD_TASK_SERVICE } from './core/i-add-task.service';
import { TaskService } from './core/task.service';
import { StubLocalDataApiService } from './data-api/data-api.service';
import { DATA_API_SERVICE } from './core/i-data-api.service';
import { DELETE_TASK_SERVICE } from './core/i-delete-task.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule
    ],
    providers: [{
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { appearance: 'outline' }
    }, {
        provide: TASK_SERVICE,
        useExisting: TaskService
    }, {
        provide: ADD_TASK_SERVICE,
        useExisting: TaskService
    }, {
        provide: DELETE_TASK_SERVICE,
        useExisting: TaskService
    }, {
        provide: DATA_API_SERVICE,
        useExisting: StubLocalDataApiService
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
