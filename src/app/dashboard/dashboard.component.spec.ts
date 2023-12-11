import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TASK_SERVICE } from '../core/i-task.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatTableModule, NoopAnimationsModule],
            declarations: [DashboardComponent, TaskListComponent, SearchBarComponent],
            // The TaskService is not used in this test, but is a dependency of TaskListComponent so it is sufficient to mock it with a non
            // null value
            providers: [{ provide: TASK_SERVICE, useValue: '' }],
        })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
        TDD: First write the test for an outside in approach. At the time this test was committed, the test is failing.
    */
    it('should contain a task list component element', () => {
        const taskListElement = fixture.nativeElement.querySelector('tla-task-list');
        expect(taskListElement).withContext('task list element is present').toBeTruthy();
    });
});
