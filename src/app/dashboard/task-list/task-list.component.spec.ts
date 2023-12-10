import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableModule } from '@angular/material/table';

import { TaskListComponent } from './task-list.component';
import { ITaskService, TASK_SERVICE } from '../../i-task.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../../shared/task';
import { Injectable } from '@angular/core';

/*
    Needed to have control over the Observable inside our mocked service.
*/
const _tasks$: Subject<Task[]> = new BehaviorSubject<Task[]>([]);

/*
    A mock for the service that has to implement a certain contract used in the tests.
*/
@Injectable({
    providedIn: null,
})
class MockTaskService implements ITaskService {
    tasks$: Observable<Task[]> = _tasks$.asObservable();
}

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskListComponent],
            providers: [{ provide: TASK_SERVICE, useClass: MockTaskService }],
            imports: [MatTableModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
        TDD: First write the test for an outside in approach. At the time this test was committed, the test is failing.
    */
    it('should have list with same number of tasks returned from #taskService.tasks$', () => {
        const nrOfTasks = 10;
        const tasks = createTasks(nrOfTasks);
        const taskList: HTMLElement | null = fixture.nativeElement.querySelector('.task-list');
        _tasks$.next(tasks);
        fixture.detectChanges();
        expect(taskList).withContext('task list exists').toBeTruthy();
        expect(taskList?.querySelectorAll('.task-item').length).withContext('all task items are present in the list').toEqual(nrOfTasks);
    });

    /*
        TDD: Test failed first.
    */
    it('should show the title, description and status of a task', () => {
        const tasks = createTasks(10);
        _tasks$.next(tasks);
        fixture.detectChanges();
        const taskItems = getRenderedTaskItemsData(fixture);
        tasks.forEach(task => {
            expect(taskItems
                .some(({ title, description, status }) =>
                    title === task.title && description === task.description && status === task.status
                )
            ).withContext(`Task ${task.title} has information rendered`).toBeTrue();
        });
    });

    afterEach(() => {
        // reset the #tasks$ Observable to initial value after each test
        _tasks$.next([]);
    });
});

/*
    Extract code into smaller functions, to prevent duplication and so the code inside the actual is comprehensive and fast to read
*/
function createTasks(nrOfTasks: number): Task[] {
    const states = ['new', 'active', 'done'] as const;
    return new Array(nrOfTasks).fill(null).map((_val, index): Task => ({
        id: index,
        title: `Title ${index}`,
        description: `Task description ${index}`,
        status: states[index % 3]
    }));
}

/*
    This function is only used once, so it does not solve any duplication, however it still makes the task code easier to read
*/
function getRenderedTaskItemsData(fixture: ComponentFixture<TaskListComponent>): {
    title: string | null | undefined;
    description: string | null | undefined;
    status: string | null | undefined;
}[] {
    const taskList: HTMLElement | null = fixture.nativeElement.querySelector('.task-list');
    const taskItemElements: NodeListOf<HTMLElement> | undefined = taskList?.querySelectorAll('.task-item');
    const taskItems: {
        titleElement: HTMLElement | null;
        descriptionElement: HTMLElement | null;
        statusElement: HTMLElement | null;
    }[] = [];
    taskItemElements?.forEach(taskItem => taskItems.push({
        titleElement: taskItem.querySelector('.task-title'),
        descriptionElement: taskItem.querySelector('.task-description'),
        statusElement: taskItem.querySelector('.task-status')
    }));
    return taskItems.map(({ titleElement, descriptionElement, statusElement }) => ({
        title: titleElement?.textContent,
        description: descriptionElement?.textContent,
        status: statusElement?.textContent
    }));
}
