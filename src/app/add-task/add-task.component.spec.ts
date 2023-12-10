import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { TaskFormComponent } from './task-form/task-form.component';

describe('AddTaskComponent', () => {
    let component: AddTaskComponent;
    let fixture: ComponentFixture<AddTaskComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddTaskComponent, TaskFormComponent]
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
});
