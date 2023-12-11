import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskFormValue } from './shared/types/task-form-value.type';
import { ADD_TASK_SERVICE, IAddTaskService } from '../core/i-add-task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { TASK_SERVICE } from '../core/i-task.service';
import { EDIT_TASK_SERVICE } from '../core/i-edit-task.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';

describe('AddTaskComponent', () => {
    let component: AddTaskComponent;
    let fixture: ComponentFixture<AddTaskComponent>;

    const addTaskMock = new class implements IAddTaskService {
        addTask = jasmine.createSpy('addTask');
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([{path: 'dashboard', component: DashboardComponent}]), MatFormFieldModule, MatSelectModule, MatInputModule, NoopAnimationsModule, ReactiveFormsModule],
            declarations: [AddTaskComponent, TaskFormComponent],
            providers: [{
                provide: TASK_SERVICE,
                useValue: '',
            }, {
                provide: ADD_TASK_SERVICE,
                useValue: addTaskMock
            }, {
                provide: EDIT_TASK_SERVICE,
                useValue: ''
            }, {
                provide: ActivatedRoute,
                useValue: {
                    paramMap: of(convertToParamMap({id: 1}))
                }
            }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AddTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a task form', () => {
        const taskForm: HTMLElement | null = fixture.nativeElement.querySelector('tla-task-form');
        expect(taskForm).withContext('task form is rendered').toBeTruthy();
    });

    it('should add the task from the form to #taskService', () => {
        const taskFormValue: TaskFormValue = {
            title: 'Task form task',
            description: 'Pass this to addTask on the service',
            status: 'active'
        };
        const taskForm: TaskFormComponent = fixture.debugElement.query(By.directive(TaskFormComponent)).componentInstance;
        taskForm.submitted.emit(taskFormValue);
        expect(addTaskMock.addTask).withContext('calls addTask with Task from task form').toHaveBeenCalledOnceWith(taskFormValue);
    });
});
