import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlankPageComponent } from './blank-page/blank-page.component';

const routes: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'vien' },
            { path: 'vien', loadChildren: () => import('./vien/vien.module').then(m => m.VienModule) },
            { path: 'second-menu', loadChildren: () => import('./second-menu/second-menu.module').then(m => m.SecondMenuModule) },
            { path: 'blank-page', component: BlankPageComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
