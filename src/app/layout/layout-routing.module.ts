import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { SeatAllocationComponent } from './seat-allocation/seat-allocation.component';


import { SeatsImportComponent } from './seats-import/seats-import.component';
import { BayLayoutComponent } from './bay-layout/bay-layout.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'approve-request', component: ApproveRequestComponent },
            { path: 'allocate-seats', component: SeatAllocationComponent },
            { path: 'import', component: SeatsImportComponent },
            { path: 'bayLayout', component: BayLayoutComponent },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes,
    )],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
