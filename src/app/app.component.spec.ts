import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatToolbarModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should render with title 'Task List Assessment'`, () => {
        const titleElement: HTMLElement = fixture.nativeElement.querySelector('.topbar-title');
        expect(titleElement).withContext('title element is present').toBeTruthy();
        expect(titleElement.textContent).withContext('title element has text "Task List Assessment"').toEqual('Task List Assessment');
    });
});
