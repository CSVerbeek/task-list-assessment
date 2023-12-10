import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { ITaskService, TASK_SERVICE } from '../i-task.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../shared/task';

/*
    Needed to have control over the Observable inside our mocked service.
*/
const _tasks$: Subject<Task[]> = new BehaviorSubject<Task[]>([]);

/*
    A mock for the service that has to implement a certain contract used in the tests.
*/
class MockTaskService implements ITaskService {
    tasks$: Observable<Task[]> = _tasks$.asObservable();
    findById(id: Task['id']): Observable<Task | undefined> {
        return this.tasks$.pipe(
            map((tasks: Task[]): Task | undefined => tasks.find(task => task.id === id))
        );
    }
}

describe('TaskDetailsComponent', () => {
    let component: TaskDetailsComponent;
    let fixture: ComponentFixture<TaskDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaskDetailsComponent],
            providers: [{ provide: TASK_SERVICE, useClass: MockTaskService }],
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
        TDD: Test fails at time of commit.
    */
    it('should receive task with id from route through #task$', () => {
        // TODO: Make sure the component gets id 123 from ActivatedRoute
        const task123: Task = {
            id: 123,
            title: 'Task found by id',
            description: 'Find this task by its id',
            status: 'new'
        };
        _tasks$.next([task123]);
        const taskSpy = jasmine.createSpy('task');
        component.task$.subscribe({
            next: taskSpy
        });
        expect(taskSpy).withContext('#task$ received task with id 123').toHaveBeenCalledOnceWith(task123);
    });
});
