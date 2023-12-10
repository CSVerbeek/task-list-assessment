import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddTaskComponent', () => {
    let component: AddTaskComponent;
    let fixture: ComponentFixture<AddTaskComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatSelectModule, MatInputModule, NoopAnimationsModule, ReactiveFormsModule],
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
