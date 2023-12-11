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
import { DATA_API_SERVICE, IDataApiService } from './core/i-data-api.service';
import { Observable, of } from 'rxjs';
import { Task } from './shared/task';

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
        provide: DATA_API_SERVICE,
        // Temporarily use a stub for development, so ng serve works without errors
        useValue: new class implements IDataApiService {
            getTasks(): Observable<Task[]> {
                return of([]);
            }
            postTask(task: Omit<Task, 'id'>): Observable<Task> {
                return of({
                    id: 1,
                    ...task
                });
            }
}
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
