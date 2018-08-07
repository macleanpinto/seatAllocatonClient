import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { PageHeaderModule, SharedPipesModule, StatModule } from '../shared';
import { HttpModule } from '@angular/http';


import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AppServiceModule } from './providers/app-services-module';

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
        HttpModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, ApproveRequestComponent],
    providers: [MessageService, AppServiceModule]
})
export class LayoutModule { }
