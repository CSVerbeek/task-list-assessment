import { Component, Inject, Input } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../shared/task';
import { ITaskService, TASK_SERVICE } from '../../core/i-task.service';
import { Router } from '@angular/router';

@Component({
    selector: 'tla-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
    readonly searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    readonly tasks$: Observable<Task[]>;

    @Input()
    set searchValue(value: string) {
        this.searchValue$.next(value);
    }

    constructor(@Inject(TASK_SERVICE) public taskService: ITaskService, private router: Router) {
        this.tasks$ = combineLatest([this.taskService.tasks$, this.searchValue$])
            .pipe(
                map(([tasks, searchValue]): Task[] => this.filterTasksBySearchByValue(tasks, searchValue))
            );
    }

    get searchValue(): string {
        return this.searchValue$.value;
    }

    onTaskRowClick(id: Task['id']): void {
        this.router.navigate(['/task-details', id]);
    }

    splitOnSearchValue(value: string): { text: string; match: boolean }[] {
        if (!this.searchValue || !value.includes(this.searchValue)) {
            return [{ text: value, match: false }];
        }
        const result = value.split(this.searchValue)
            .flatMap(part => ([{ text: part, match: false }, { text: this.searchValue, match: true }]));
        delete result[result.length - 1];
        return result;
    }

    private filterTasksBySearchByValue(tasks: Task[], searchValue: string): Task[] {
        if (!searchValue) {
            return tasks;
        }
        return tasks.filter(task => task.title.toLowerCase().includes(searchValue.toLocaleLowerCase()) || task.description.toLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
}
