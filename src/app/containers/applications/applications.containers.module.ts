import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  CollapseModule  } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { AddNewTodoModalComponent } from './add-new-todo-modal/add-new-todo-modal.component';
import { AddNewLeaveModalComponent } from './leave-modal/add-leave-modal/add-new-leave-modal.component';
import { AddNewLeaveSickModalComponent } from './leave-modal/add-leave-modal/add-new-sick-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddNewSurveyModalComponent } from './add-new-survey-modal/add-new-survey-modal.component';
import { QuestionBuilderComponent } from './question-builder/question-builder.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { LayoutContainersModule } from '../layout/layout.containers.module';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module'; 
import {  BsDropdownModule  } from 'ngx-bootstrap/dropdown';
import { ComponentsModule } from 'src/app/views/app/ui/components/components.module';
 
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; 
import { CalendarModule, DateAdapter, CalendarNativeDateFormatter, DateFormatterParams, CalendarDateFormatter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms'; 
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
@NgModule({
  declarations: [
    AddNewTodoModalComponent,
    AddNewSurveyModalComponent,
    AddNewLeaveModalComponent,
    AddNewLeaveSickModalComponent,
    QuestionBuilderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CollapseModule,
    FormsModule,
    LayoutContainersModule,
    NgSelectModule,
    SortablejsModule, 
    FormsModuleAngular,
    ReactiveFormsModule,
    PagesContainersModule, 
    FormValidationsContainersModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    AddNewTodoModalComponent,
    AddNewSurveyModalComponent,
    AddNewLeaveModalComponent,
    AddNewLeaveSickModalComponent,
    QuestionBuilderComponent
  ]
})
export class ApplicationsContainersModule { }
