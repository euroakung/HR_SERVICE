
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { TodoComponent } from './todo/todo.component'; 
//import { ApproveLeaveComponentDetailComponent } from './leave-detail/leave-detail.component';
 


import { LeaveComponent } from './leave/leave.component';
import { LeaveDetailComponent } from './leave-detail/leave-detail.component';
import { LeaveApproveComponent } from './leave-approver/leave-approver.component';
 

import { SurveyComponent } from './survey/survey.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { ChatComponent } from './chat/chat.component';
import { ApplicationsRoutingModule } from './applications.routing';
 
import { FormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ApplicationsContainersModule } from 'src/app/containers/applications/applications.containers.module';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { SortablejsModule } from 'ngx-sortablejs'; 
import {  ModalModule  } from 'ngx-bootstrap/modal'; 
import {  ProgressbarModule  } from 'ngx-bootstrap/progressbar'; 
import {  TabsModule  } from 'ngx-bootstrap/tabs';  
import { SharedModule } from 'src/app/shared/shared.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';    
 
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module'; 
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module'; 

import {  BsDropdownModule  } from 'ngx-bootstrap/dropdown';
import { ComponentsModule } from 'src/app/views/app/ui/components/components.module';




@NgModule({
  declarations: [ApplicationsComponent, TodoComponent, SurveyComponent,
     SurveyDetailComponent, ChatComponent,LeaveComponent,LeaveDetailComponent  ,LeaveApproveComponent
      ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ApplicationsRoutingModule,
    LayoutContainersModule,
    ApplicationsContainersModule, 
    ComponentsChartModule,
    SortablejsModule, 
    NgxDatatableModule,
    ComponentsModule,
    PagesContainersModule,
    BsDropdownModule.forRoot(),
    HotkeyModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ]
})
export class ApplicationsModule { }
