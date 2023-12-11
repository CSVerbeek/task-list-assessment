import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'tla-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {
    @Output()
    searchValueChange = new EventEmitter<string>();

    private destroy$ = new Subject<void>();

    searchForm = new FormGroup<{
        searchValue: FormControl<string>
    }>({
        searchValue: new FormControl<string>('', { nonNullable: true })
    });

    ngOnInit(): void {
        this.searchForm.controls.searchValue.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                throttleTime(500, undefined, { leading: true, trailing: true })
            )
            .subscribe({
                next: newValue => this.searchValueChange.emit(newValue)
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
