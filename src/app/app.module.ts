import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ITaskService, TASK_SERVICE } from './i-task.service';
import { BehaviorSubject, Observable } from 'rxjs';
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
        provide: TASK_SERVICE,
        // Temporarily use a stub for development, so ng serve works without errors
        useValue: new class implements ITaskService {
            tasks$: Observable<Task[]> = new BehaviorSubject<Task[]>(
                new Array(5).fill(null).map((_val, index): Task => ({
                    title: `Title ${index}`,
                    description: `Description ${index}`,
                    status: 'new'
                }))
            );
        }
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
