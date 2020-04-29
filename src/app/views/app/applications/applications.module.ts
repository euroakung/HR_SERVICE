import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { TodoComponent } from './todo/todo.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { ChatComponent } from './chat/chat.component';
import { ApplicationsRoutingModule } from './applications.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { ApplicationsContainersModule } from 'src/app/containers/applications/applications.containers.module';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { SortablejsModule } from 'ngx-sortablejs';
import { CollapseModule, TabsModule, ProgressbarModule, ModalModule } from 'ngx-bootstrap';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';

@NgModule({
  declarations: [ApplicationsComponent, TodoComponent, SurveyComponent, SurveyDetailComponent, ChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ApplicationsRoutingModule,
    LayoutContainersModule,
    ApplicationsContainersModule,
    ComponentsChartModule,
    SortablejsModule,
    HotkeyModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class ApplicationsModule { }
