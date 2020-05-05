import { ResponsiveComponent } from './../ui/datatables/responsive/responsive.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from './applications.component';

 import { LeaveComponent } from './leave/leave.component'; 
 import { TodoComponent } from './todo/todo.component';
 import { LeaveDetailComponent } from './leave-detail/leave-detail.component';
import { SurveyComponent } from './survey/survey.component';
import { ChatComponent } from './chat/chat.component'; 
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { LeaveApproveComponent } from './/leave-approver/leave-approver.component';

const routes: Routes = [
    {
        path: '', component: ApplicationsComponent,
        children: [
            { path: '', redirectTo: 'leave', pathMatch: 'full' },
            { path: 'todo', component: TodoComponent },
            { path: 'leave', component: LeaveComponent },
            { path: 'leave/:id', component: LeaveDetailComponent },
            { path: 'leave-approve', component: LeaveApproveComponent },
            { path: 'chat ', component: ChatComponent},
            
            { path: 'survey/:id/:name', component: SurveyDetailComponent },
            { path: 'survey/:id', component: SurveyDetailComponent },
            { path: 'survey', component: SurveyComponent },
            // { path: 'survey-detail',  component: SurveyDetailComponent },

            { path: 'chat', component: ChatComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
