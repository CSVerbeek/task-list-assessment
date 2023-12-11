import { TaskService } from './task.service';
import { IDataApiService } from './i-data-api.service';
import { Observable, of } from 'rxjs';
import { Task } from '../shared/task';

describe('TaskService', () => {
    let dataApi: IDataApiService;
    let service: TaskService;

    beforeEach(() => {
        dataApi = new class implements IDataApiService {
            getTasks(): Observable<Task[]> {
                return of([{
                    id: 1,
                    title: 'The first task',
                    description: 'Write this test',
                    status: 'active'
                }]);
            }
            postTask(task: Omit<Task, 'id'>): Observable<Task> {
                return of({
                    id: 2,
                    ...task
                });
            }
        }
        service = new TaskService(dataApi);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get tasks from #dataApi.getTasks when service is created', () => {
        service.tasks$.subscribe({
            next: tasks => expect(tasks).withContext('has tasks from #dataApi').toEqual([{
                id: 1,
                title: 'The first task',
                description: 'Write this test',
                status: 'active'
            }])
        });
    });

    it('should add newly created task to the tasks of the service', async () => {
        const newTask: Omit<Task, 'id'> = {
            title: 'New task',
            description: 'Add this to the list',
            status: 'new'
        };
        await service.addTask(newTask);
        service.tasks$.subscribe({
            next: tasks => expect(tasks).withContext('has tasks from #dataApi').toEqual([{
                id: 1,
                title: 'The first task',
                description: 'Write this test',
                status: 'active'
            }, {
                id: 2,
                ...newTask
            }])
        });
    });
});
