import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ITaskService, TASK_SERVICE } from './i-task.service';
import { Task } from './shared/task';
import { ADD_TASK_SERVICE, IAddTaskService } from './i-add-task.service';

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
        // Temporarily use a stub for development, so ng serve works without errors
        useValue: new class implements ITaskService {
            tasks$: Observable<Task[]> = new BehaviorSubject<Task[]>(
                new Array(5).fill(null).map((_val, index): Task => ({
                    id: index,
                    title: `Title ${index}`,
                    description: `Description ${index}`,
                    status: 'new'
                }))
            );
            findById(id: Task['id']): Observable<Task | undefined> {
                return this.tasks$.pipe(
                    map(tasks => tasks.find(task => task.id === id))
                );
            }
        }
    }, {
        provide: ADD_TASK_SERVICE,
        useValue: new class implements IAddTaskService {
            addTask(task: Omit<Task, 'id'>): void {
                console.log(task);
            }
        }
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
