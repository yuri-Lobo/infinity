import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DefaultDashboardComponent } from './default/default.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';

const routes: Routes = [
    {
        path: 'dashboard2',
        component: Dashboard2Component
    },
    {
        path: 'dashboard1',
        component: DefaultDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
