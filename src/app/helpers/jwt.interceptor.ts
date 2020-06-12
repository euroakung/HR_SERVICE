import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../shared/authentication.service';
import { tap } from 'rxjs/operators'; 

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        alert(localStorage.getItem('token')) ;
        if (localStorage.getItem('token') != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }

        return next.handle(request);
    }
}