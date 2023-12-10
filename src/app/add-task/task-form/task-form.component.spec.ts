import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TaskFormComponent } from './task-form.component';

fdescribe('TaskFormComponent', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatFormFieldModule, MatInputModule, MatSelectModule, NoopAnimationsModule, ReactiveFormsModule],
            declarations: [TaskFormComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TaskFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have form fields for title, description and status', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;
        const titleFormField: HTMLElement | null = nativeElement.querySelector('input.task-title');
        const descriptionFieldElement: HTMLElement | null = nativeElement.querySelector('textarea.task-description');
        const statusFieldElement: HTMLElement | null = nativeElement.querySelector('mat-select.task-status');
        expect(titleFormField).withContext('title form field is rendered').not.toBeNull();
        expect(descriptionFieldElement).withContext('description form field is rendered').not.toBeNull();
        expect(statusFieldElement).withContext('status form field is rendered').not.toBeNull();
    });

    it('should have form group with the given form values', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;
        const titleFormFieldElement: HTMLInputElement = nativeElement.querySelector('input.task-title')!;
        const descriptionFieldElement: HTMLTextAreaElement = nativeElement.querySelector('textarea.task-description')!;
        fixture.detectChanges();
        const title = 'Task title';
        const description = 'Task description';
        titleFormFieldElement.value = title;
        titleFormFieldElement.dispatchEvent(new Event('input', { bubbles: true }));
        descriptionFieldElement.value = description;
        descriptionFieldElement.dispatchEvent(new Event('input', { bubbles: true }));

        // mat-select field was difficult to set value on element, so just use default value
        expect(component.taskForm.value).withContext('contains the correct values').toEqual({ title, description, status: 'new' });
    });
});
