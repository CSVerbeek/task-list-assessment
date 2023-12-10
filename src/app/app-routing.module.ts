import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
}, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
}, {
    path: 'task-details',
    loadChildren: () => import('./task-details/task-details.module').then(m => m.TaskDetailsModule)
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
