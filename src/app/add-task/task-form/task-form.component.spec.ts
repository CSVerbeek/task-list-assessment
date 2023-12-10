import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';

fdescribe('TaskFormComponent', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
        const descriptionFieldElement: HTMLElement | null = nativeElement.querySelector('input.task-description');
        const statusFieldElement: HTMLElement | null = nativeElement.querySelector('mat-select.task-description');
        expect(titleFormField).withContext('title form field is rendered').not.toBeNull();
        expect(descriptionFieldElement).withContext('description form field is rendered').not.toBeNull();
        expect(statusFieldElement).withContext('status form field is rendered').not.toBeNull();
    });
});
