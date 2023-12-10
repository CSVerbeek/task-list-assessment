import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { ITaskService, TASK_SERVICE } from '../i-task.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../shared/task';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

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
            imports: [MatCardModule],
            providers: [{
                provide: ActivatedRoute,
                useValue: { paramMap: of(convertToParamMap({ id: 123 })) }
            }, {
                provide: TASK_SERVICE, useClass: MockTaskService
            }],
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

    it('should render the details on the screen', () => {
        const task: Task = {
            id: 123,
            title: 'First task',
            description: 'This is the first task to do',
            status: 'done'
        };
        _tasks$.next([task]);
        fixture.detectChanges();

        const nativeElement: HTMLElement = fixture.nativeElement;
        const title: string | null | undefined = nativeElement.querySelector('.task-title')?.textContent?.trim();
        const description: string | null | undefined = nativeElement.querySelector('.task-description')?.textContent?.trim();
        const status: string | null | undefined = nativeElement.querySelector('.task-status')?.textContent?.trim();
        expect({ id: 123, title, description, status }).withContext('rendered details match the found task').toEqual(task);
    });


    afterEach(() => {
        // reset the #tasks$ Observable to initial value after each test
        _tasks$.next([]);
    });
});
