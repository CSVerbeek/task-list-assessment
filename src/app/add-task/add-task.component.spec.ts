import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';

describe('AddTaskComponent', () => {
    let component: AddTaskComponent;
    let fixture: ComponentFixture<AddTaskComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddTaskComponent]
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
        const taskForm: HTMLElement | null = fixture.nativeElement.querySelector('.task-form');
        expect(taskForm).withContext('task form is rendered').toBeTruthy();
    });
});
