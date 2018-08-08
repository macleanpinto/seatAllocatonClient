import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';

import { SeatAllocationComponent } from './seat-allocation/seat-allocation.component';

import { PageHeaderModule, SharedPipesModule, StatModule } from '../shared';
import { HttpModule } from '@angular/http';
import { SeatsImportComponent } from './seats-import/seats-import.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppServiceModule } from './providers/app-services-module';
import { BayLayoutComponent } from './bay-layout/bay-layout.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        PageHeaderModule, SharedPipesModule, StatModule,
        TableModule,
        ToastModule,
        AppServiceModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent,
        ApproveRequestComponent, SeatsImportComponent, SeatAllocationComponent, BayLayoutComponent],
    providers: [MessageService, AppServiceModule]
})
export class LayoutModule { }
