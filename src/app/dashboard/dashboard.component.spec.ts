import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TASK_SERVICE } from '../i-task.service';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent, TaskListComponent],
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
