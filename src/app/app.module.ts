import { BrowserModule  } from '@angular/platform-browser';
 
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AngularFireModule } from '@angular/fire'; 
import { environment } from '../environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';


import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthInterceptor, ErrorInterceptor } from './helpers';
 
@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule, 
     AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
    BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
