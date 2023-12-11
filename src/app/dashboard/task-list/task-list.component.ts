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
        if (!this.searchValue || !value.toLowerCase().includes(this.searchValue.toLowerCase())) {
            return [{ text: value, match: false }];
        }

        const regex = new RegExp(this.searchValue, 'gi');
        const matches: { text: string; match: true }[] = [];
        let match;

        while ((match = regex.exec(value)) !== null) {
            matches.push({ text: match[0], match: true });
        }

        const nonMatches: { text: string; match: false }[] = value.split(regex).map(part => ({
            text: part,
            match: false
        }));

        // There should be exactly one more non match than matches. Therefore the index will get out of bounds with the last index.
        return nonMatches.flatMap((nonMatch, index) => [nonMatch, matches[index] ?? { text: '', match: 'false' }]);
    }

    private filterTasksBySearchByValue(tasks: Task[], searchValue: string): Task[] {
        if (!searchValue) {
            return tasks;
        }
        return tasks.filter(task => task.title.toLowerCase().includes(searchValue.toLocaleLowerCase()) || task.description.toLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
}
