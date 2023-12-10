import { Component } from '@angular/core';

@Component({
    selector: 'tla-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    searchValue: string = '';

    onSearchValueChange(newValue: string): void {
        this.searchValue = newValue;
    }
}
